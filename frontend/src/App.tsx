import { useState } from 'react'
import { Battle } from './components/Battle'
import { PokemonSelection } from './components/PokemonSelection'
import { Pokemon, Move, Type } from './types/pokemon'

// Temporary mock data for testing
const mockPokemon: Pokemon = {
  name: "Charmander",
  level: 5,
  hp: 39,
  max_hp: 39,
  attack: 52,
  defense: 43,
  speed: 65,
  type1: Type.FIRE,
  moves: [
    {
      name: "Scratch",
      type: Type.NORMAL,
      power: 40,
      accuracy: 100,
      pp: 35,
      description: "A basic attack that scratches the target."
    },
    {
      name: "Ember",
      type: Type.FIRE,
      power: 40,
      accuracy: 100,
      pp: 25,
      description: "A weak fire attack that may burn the target."
    }
  ]
}

const mockOpponent: Pokemon = {
  name: "Squirtle",
  level: 5,
  hp: 44,
  max_hp: 44,
  attack: 48,
  defense: 65,
  speed: 43,
  type1: Type.WATER,
  moves: [
    {
      name: "Tackle",
      type: Type.NORMAL,
      power: 40,
      accuracy: 100,
      pp: 35,
      description: "A basic attack that tackles the target."
    },
    {
      name: "Water Gun",
      type: Type.WATER,
      power: 40,
      accuracy: 100,
      pp: 25,
      description: "A weak water attack that may soak the target."
    }
  ]
}

function App() {
  const [playerPokemon, setPlayerPokemon] = useState<Pokemon | null>(null)
  const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(null)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setPlayerPokemon(pokemon)
    setOpponentPokemon(mockOpponent)
    setGameStarted(true)
  }

  const handleMoveSelect = (move: Move) => {
    if (!playerPokemon || !opponentPokemon) return

    // Calculate damage (simplified for now)
    const damage = Math.floor(
      ((2 * playerPokemon.level / 5 + 2) * move.power * playerPokemon.attack / opponentPokemon.defense) / 50 + 2
    )

    // Apply damage
    setOpponentPokemon(prev => {
      if (!prev) return null
      return {
        ...prev,
        hp: Math.max(0, prev.hp - damage)
      }
    })

    // Check for game over
    if (opponentPokemon.hp - damage <= 0) {
      alert("You won!")
      setGameStarted(false)
      setPlayerPokemon(null)
      setOpponentPokemon(null)
      return
    }

    // Opponent's turn
    setIsPlayerTurn(false)
    setTimeout(() => {
      // Simple AI: choose first available move
      const opponentMove = opponentPokemon.moves[0]
      const opponentDamage = Math.floor(
        ((2 * opponentPokemon.level / 5 + 2) * opponentMove.power * opponentPokemon.attack / playerPokemon.defense) / 50 + 2
      )

      setPlayerPokemon(prev => {
        if (!prev) return null
        return {
          ...prev,
          hp: Math.max(0, prev.hp - opponentDamage)
        }
      })

      // Check for game over
      if (playerPokemon.hp - opponentDamage <= 0) {
        alert("You lost!")
        setGameStarted(false)
        setPlayerPokemon(null)
        setOpponentPokemon(null)
        return
      }

      setIsPlayerTurn(true)
    }, 1000)
  }

  if (!gameStarted) {
    return <PokemonSelection pokemon={[mockPokemon]} onSelect={handlePokemonSelect} />
  }

  if (!playerPokemon || !opponentPokemon) {
    return <div>Loading...</div>
  }

  return (
    <Battle
      playerPokemon={playerPokemon}
      opponentPokemon={opponentPokemon}
      onMoveSelect={handleMoveSelect}
      isPlayerTurn={isPlayerTurn}
    />
  )
}

export default App
