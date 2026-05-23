import { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import { Battle } from './components/Battle'
import { PokemonSelection } from './components/PokemonSelection'
import { BattleResults } from './components/BattleResults'
import { Pokemon, Move } from './types/pokemon'
import { getRandomPokemon, getPokemonByName } from './data'

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a237e, #0d47a1);
  color: white;
`

type GameState = 'selection' | 'battle' | 'results'

export const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('selection')
  const [playerPokemon, setPlayerPokemon] = useState<Pokemon | null>(null)
  const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(null)
  const [battleMessage, setBattleMessage] = useState<string>('')
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true)
  const [winner, setWinner] = useState<Pokemon | null>(null)

  const handlePokemonSelect = useCallback((pokemon: Pokemon) => {
    const opponent = getRandomPokemon()
    setPlayerPokemon(pokemon)
    setOpponentPokemon(opponent)
    setBattleMessage(`${pokemon.name} vs ${opponent.name}! Go!`)
    setIsPlayerTurn(true)
    setWinner(null)
    setGameState('battle')
  }, [])

  const getTypeMultiplier = (moveType: string, defenderType1: string, defenderType2?: string): number => {
    const typeChart: { [key: string]: { [key: string]: number } } = {
      Normal:   { Rock: 0.5, Steel: 0.5, Ghost: 0 },
      Fire:     { Fire: 0.5, Water: 0.5, Grass: 2, Ice: 2, Bug: 2, Rock: 0.5, Dragon: 0.5, Steel: 2 },
      Water:    { Fire: 2, Water: 0.5, Grass: 0.5, Ground: 2, Rock: 2, Dragon: 0.5 },
      Electric: { Water: 2, Grass: 0.5, Electric: 0.5, Ground: 0, Flying: 2, Dragon: 0.5 },
      Grass:    { Fire: 0.5, Water: 2, Grass: 0.5, Poison: 0.5, Ground: 2, Flying: 0.5, Bug: 0.5, Rock: 2, Dragon: 0.5 },
      Ice:      { Water: 0.5, Grass: 2, Ice: 0.5, Ground: 2, Flying: 2, Dragon: 2 },
      Fighting: { Normal: 2, Ice: 2, Poison: 0.5, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2, Ghost: 0, Dark: 2, Steel: 2, Fairy: 0.5 },
      Poison:   { Grass: 2, Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5, Steel: 0, Fairy: 2 },
      Ground:   { Fire: 2, Electric: 2, Grass: 0.5, Poison: 2, Flying: 0, Bug: 0.5, Rock: 2, Steel: 2 },
      Flying:   { Electric: 0.5, Grass: 2, Fighting: 2, Bug: 2, Rock: 0.5, Steel: 0.5 },
      Psychic:  { Fighting: 2, Poison: 2, Psychic: 0.5, Dark: 0, Steel: 0.5 },
      Bug:      { Fire: 0.5, Grass: 2, Fighting: 0.5, Poison: 0.5, Flying: 0.5, Psychic: 2, Ghost: 0.5, Dark: 2, Steel: 0.5, Fairy: 0.5 },
      Rock:     { Fire: 2, Ice: 2, Fighting: 0.5, Ground: 0.5, Flying: 2, Bug: 2, Steel: 0.5 },
      Ghost:    { Normal: 0, Psychic: 2, Ghost: 2, Dark: 0.5 },
      Dragon:   { Dragon: 2, Steel: 0.5, Fairy: 0 },
      Dark:     { Fighting: 0.5, Psychic: 2, Ghost: 2, Dark: 0.5, Fairy: 0.5 },
      Steel:    { Fire: 0.5, Water: 0.5, Electric: 0.5, Ice: 2, Rock: 2, Steel: 0.5, Fairy: 2 },
      Fairy:    { Fire: 0.5, Fighting: 2, Poison: 0.5, Dragon: 2, Dark: 2, Steel: 0.5 },
    }
    const m1 = typeChart[moveType]?.[defenderType1] ?? 1
    const m2 = defenderType2 ? (typeChart[moveType]?.[defenderType2] ?? 1) : 1
    return m1 * m2
  }

  const calcDamage = (attacker: Pokemon, defender: Pokemon, move: Move): number => {
    if (move.power === 0) return 0
    const base = ((2 * attacker.level / 5 + 2) * move.power * attacker.attack / defender.defense) / 50 + 2
    const mult = getTypeMultiplier(move.type, defender.type1, defender.type2)
    return Math.max(1, Math.floor(base * mult))
  }

  const handleMoveSelect = useCallback((move: Move) => {
    if (!playerPokemon || !opponentPokemon || !isPlayerTurn) return

    setIsPlayerTurn(false)

    const damage = calcDamage(playerPokemon, opponentPokemon, move)
    const mult = getTypeMultiplier(move.type, opponentPokemon.type1, opponentPokemon.type2)
    const effectiveness = mult > 1 ? " It's super effective!" : mult < 1 ? " It's not very effective..." : ''

    const newOpponentHp = Math.max(0, opponentPokemon.hp - damage)
    const updatedOpponent = { ...opponentPokemon, hp: newOpponentHp }
    setOpponentPokemon(updatedOpponent)

    const dmgMsg = damage > 0 ? `Dealt ${damage} damage!` : 'No effect!'
    setBattleMessage(`${playerPokemon.name} used ${move.name}! ${dmgMsg}${effectiveness}`)

    if (newOpponentHp <= 0) {
      setWinner(playerPokemon)
      setGameState('results')
      return
    }

    // Opponent turn after delay
    setTimeout(() => {
      const opponentMove = updatedOpponent.moves[Math.floor(Math.random() * updatedOpponent.moves.length)]
      const oppDamage = calcDamage(updatedOpponent, playerPokemon, opponentMove)
      const oppMult = getTypeMultiplier(opponentMove.type, playerPokemon.type1, playerPokemon.type2)
      const oppEffectiveness = oppMult > 1 ? " It's super effective!" : oppMult < 1 ? " It's not very effective..." : ''

      const newPlayerHp = Math.max(0, playerPokemon.hp - oppDamage)
      const updatedPlayer = { ...playerPokemon, hp: newPlayerHp }
      setPlayerPokemon(updatedPlayer)

      const oppDmgMsg = oppDamage > 0 ? `Dealt ${oppDamage} damage!` : 'No effect!'
      setBattleMessage(`${updatedOpponent.name} used ${opponentMove.name}! ${oppDmgMsg}${oppEffectiveness}`)

      if (newPlayerHp <= 0) {
        setWinner(updatedOpponent)
        setGameState('results')
      } else {
        setIsPlayerTurn(true)
      }
    }, 1500)
  }, [playerPokemon, opponentPokemon, isPlayerTurn])

  const handlePlayAgain = useCallback(() => {
    setPlayerPokemon(null)
    setOpponentPokemon(null)
    setBattleMessage('')
    setIsPlayerTurn(true)
    setWinner(null)
    setGameState('selection')
  }, [])

  return (
    <AppContainer>
      {gameState === 'selection' && (
        <PokemonSelection
          pokemon={[
            getPokemonByName('Charmander'),
            getPokemonByName('Bulbasaur'),
            getPokemonByName('Squirtle'),
            getPokemonByName('Pikachu'),
            getPokemonByName('Abra'),
            getPokemonByName('Geodude'),
            getPokemonByName('Gastly'),
            getPokemonByName('Machop'),
          ]}
          onSelect={handlePokemonSelect}
        />
      )}
      {gameState === 'battle' && playerPokemon && opponentPokemon && (
        <Battle
          playerPokemon={playerPokemon}
          opponentPokemon={opponentPokemon}
          onMoveSelect={handleMoveSelect}
          battleMessage={battleMessage}
          isPlayerTurn={isPlayerTurn}
        />
      )}
      {gameState === 'results' && winner && (
        <BattleResults winner={winner} onPlayAgain={handlePlayAgain} />
      )}
    </AppContainer>
  )
}

export default App