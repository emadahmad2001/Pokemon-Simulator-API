import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Pokemon, Move } from '../types/pokemon';

const BattleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(to bottom, #87CEEB, #E0F6FF);
  min-height: 100vh;
`;

const BattleField = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 2rem 0;
`;

const PokemonCard = styled(motion.div)<{ isPlayer: boolean }>`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1rem;
  padding: 1rem;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: ${props => props.isPlayer ? 'none' : 'scaleX(-1)'};
`;

const HealthBar = styled.div`
  width: 100%;
  height: 20px;
  background: #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin: 0.5rem 0;
`;

const HealthFill = styled(motion.div)<{ percentage: number }>`
  width: ${props => props.percentage}%;
  height: 100%;
  background: ${props => props.percentage > 50 ? '#4CAF50' : props.percentage > 20 ? '#FFC107' : '#F44336'};
  transition: width 0.3s ease;
`;

const MovesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 600px;
`;

const MoveButton = styled(motion.button)`
  background: white;
  border: 2px solid #ddd;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface BattleProps {
  playerPokemon: Pokemon;
  opponentPokemon: Pokemon;
  onMoveSelect: (move: Move) => void;
  isPlayerTurn: boolean;
}

export const Battle: React.FC<BattleProps> = ({
  playerPokemon,
  opponentPokemon,
  onMoveSelect,
  isPlayerTurn
}) => {
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);

  const handleMoveClick = (move: Move) => {
    if (move.pp > 0) {
      setSelectedMove(move);
      onMoveSelect(move);
    }
  };

  return (
    <BattleContainer>
      <BattleField>
        <PokemonCard
          isPlayer={true}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>{playerPokemon.name}</h2>
          <HealthBar>
            <HealthFill
              percentage={(playerPokemon.hp / playerPokemon.max_hp) * 100}
              initial={{ width: 0 }}
              animate={{ width: `${(playerPokemon.hp / playerPokemon.max_hp) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </HealthBar>
          <p>HP: {playerPokemon.hp}/{playerPokemon.max_hp}</p>
        </PokemonCard>

        <PokemonCard
          isPlayer={false}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>{opponentPokemon.name}</h2>
          <HealthBar>
            <HealthFill
              percentage={(opponentPokemon.hp / opponentPokemon.max_hp) * 100}
              initial={{ width: 0 }}
              animate={{ width: `${(opponentPokemon.hp / opponentPokemon.max_hp) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </HealthBar>
          <p>HP: {opponentPokemon.hp}/{opponentPokemon.max_hp}</p>
        </PokemonCard>
      </BattleField>

      {isPlayerTurn && (
        <MovesContainer>
          {playerPokemon.moves.map((move, index) => (
            <MoveButton
              key={index}
              onClick={() => handleMoveClick(move)}
              disabled={move.pp <= 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3>{move.name}</h3>
              <p>PP: {move.pp}</p>
              <p>{move.description}</p>
            </MoveButton>
          ))}
        </MovesContainer>
      )}
    </BattleContainer>
  );
}; 