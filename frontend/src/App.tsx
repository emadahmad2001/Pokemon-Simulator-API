import { useState } from 'react'
import styled from '@emotion/styled'
import { Battle } from './components/Battle'
import { PokemonSelection } from './components/PokemonSelection'
import { BattleResults } from './components/BattleResults'
import { Pokemon, Move, Type } from './types/pokemon'
import { getRandomPokemon, getPokemonByName } from './data'

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a237e, #0d47a1);
  color: white;
`

export const App: React.FC = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(null)
  const [battleMessage, setBattleMessage] = useState<string>('')
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [winner, setWinner] = useState<Pokemon | null>(null)

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon)
    const opponent = getRandomPokemon()
    setOpponentPokemon(opponent)
    setBattleMessage(`${pokemon.name} vs ${opponent.name}!`)
    setIsPlayerTurn(true)
    setGameOver(false)
    setWinner(null)
  }

  const handleMoveSelect = (move: Move) => {
    if (!selectedPokemon || !opponentPokemon) return

    // Player's turn
    const playerDamage = calculateDamage(selectedPokemon, opponentPokemon, move)
    opponentPokemon.hp -= playerDamage
    setBattleMessage(`${selectedPokemon.name} used ${move.name}! It dealt ${playerDamage} damage!`)

    // Check if opponent is defeated
    if (opponentPokemon.hp <= 0) {
      opponentPokemon.hp = 0
      setGameOver(true)
      setWinner(selectedPokemon)
      return
    }

    // Opponent's turn
    setTimeout(() => {
      const opponentMove = opponentPokemon.moves[Math.floor(Math.random() * opponentPokemon.moves.length)]
      const opponentDamage = calculateDamage(opponentPokemon, selectedPokemon, opponentMove)
      selectedPokemon.hp -= opponentDamage
      setBattleMessage(`${opponentPokemon.name} used ${opponentMove.name}! It dealt ${opponentDamage} damage!`)

      // Check if player is defeated
      if (selectedPokemon.hp <= 0) {
        selectedPokemon.hp = 0
        setGameOver(true)
        setWinner(opponentPokemon)
      } else {
        setIsPlayerTurn(true)
      }
    }, 1500)
  }

  const calculateDamage = (attacker: Pokemon, defender: Pokemon, move: Move): number => {
    const baseDamage = ((2 * attacker.level / 5 + 2) * move.power * attacker.attack / defender.defense) / 50 + 2
    const typeMultiplier = getTypeMultiplier(move.type, defender.type1, defender.type2)
    return Math.floor(baseDamage * typeMultiplier)
  }

  const getTypeMultiplier = (moveType: string, defenderType1: string, defenderType2?: string): number => {
    const typeChart: { [key: string]: { [key: string]: number } } = {
      Normal: { Rock: 0.5, Steel: 0.5, Ghost: 0 },
      Fire: { Fire: 0.5, Water: 0.5, Grass: 2, Ice: 2, Bug: 2, Rock: 0.5, Dragon: 0.5, Steel: 2 },
      Water: { Fire: 2, Water: 0.5, Grass: 0.5, Ground: 2, Rock: 2, Dragon: 0.5 },
      Electric: { Water: 2, Grass: 0.5, Electric: 0.5, Ground: 0, Flying: 2, Dragon: 0.5 },
      Grass: { Fire: 0.5, Water: 2, Grass: 0.5, Poison: 0.5, Ground: 2, Flying: 0.5, Bug: 0.5, Rock: 2, Dragon: 0.5 },
      Ice: { Water: 0.5, Grass: 2, Ice: 0.5, Ground: 2, Flying: 2, Dragon: 2 },
      Fighting: { Normal: 2, Ice: 2, Poison: 0.5, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2, Ghost: 0, Dragon: 2, Dark: 2, Steel: 2, Fairy: 0.5 },
      Poison: { Grass: 2, Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5, Steel: 0, Fairy: 2 },
      Ground: { Fire: 2, Electric: 2, Grass: 0.5, Poison: 2, Flying: 0, Bug: 0.5, Rock: 2, Steel: 2 },
      Flying: { Electric: 0.5, Grass: 2, Fighting: 2, Bug: 2, Rock: 0.5, Steel: 0.5 },
      Psychic: { Fighting: 2, Poison: 2, Psychic: 0.5, Dark: 0, Steel: 0.5 },
      Bug: { Fire: 0.5, Grass: 2, Fighting: 0.5, Poison: 0.5, Flying: 0.5, Psychic: 2, Ghost: 0.5, Dark: 2, Steel: 0.5, Fairy: 0.5 },
      Rock: { Fire: 2, Ice: 2, Fighting: 0.5, Ground: 0.5, Flying: 2, Bug: 2, Steel: 0.5 },
      Ghost: { Normal: 0, Psychic: 2, Ghost: 2, Dark: 0.5 },
      Dragon: { Dragon: 2, Steel: 0.5, Fairy: 0 },
      Dark: { Fighting: 0.5, Psychic: 2, Ghost: 2, Dark: 0.5, Fairy: 0.5 },
      Steel: { Fire: 0.5, Water: 0.5, Electric: 0.5, Ice: 2, Rock: 2, Steel: 0.5, Fairy: 2 },
      Fairy: { Fire: 0.5, Fighting: 2, Poison: 0.5, Dragon: 2, Dark: 2, Steel: 0.5 }
    }

    const multiplier1 = typeChart[moveType]?.[defenderType1] || 1
    const multiplier2 = defenderType2 ? typeChart[moveType]?.[defenderType2] || 1 : 1
    return multiplier1 * multiplier2
  }

  const handlePlayAgain = () => {
    setSelectedPokemon(null)
    setOpponentPokemon(null)
    setBattleMessage('')
    setIsPlayerTurn(true)
    setGameOver(false)
    setWinner(null)
  }

  return (
    <AppContainer>
      {!selectedPokemon ? (
        <PokemonSelection
          pokemon={[
            getPokemonByName('Charmander'),
            getPokemonByName('Bulbasaur'),
            getPokemonByName('Squirtle'),
            getPokemonByName('Pikachu'),
            getPokemonByName('Abra'),
            getPokemonByName('Geodude')
          ]}
          onSelect={handlePokemonSelect}
        />
      ) : gameOver && winner ? (
        <BattleResults winner={winner} onPlayAgain={handlePlayAgain} />
      ) : selectedPokemon && opponentPokemon ? (
        <Battle
          playerPokemon={selectedPokemon}
          opponentPokemon={opponentPokemon}
          onMoveSelect={handleMoveSelect}
          battleMessage={battleMessage}
          isPlayerTurn={isPlayerTurn}
        />
      ) : null}
    </AppContainer>
  )
}

export default App
