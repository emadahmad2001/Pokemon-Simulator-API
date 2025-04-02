import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Pokemon, Move } from '../types/pokemon';

const BattleContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a237e, #0d47a1);
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/pokeball-pattern.png') repeat;
    opacity: 0.1;
    pointer-events: none;
  }
`;

const BattleField = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const PokemonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50%;
`;

const PokemonCard = styled(motion.div)<{ isOpponent?: boolean }>`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  width: 45%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::before {
    transform: translateX(100%);
  }
`;

const PokemonName = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const HealthBar = styled.div`
  width: 100%;
  height: 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  overflow: hidden;
  margin: 1rem 0;
  position: relative;
`;

const HealthFill = styled(motion.div)<{ health: number }>`
  width: ${props => props.health}%;
  height: 100%;
  background: ${props => {
    if (props.health > 60) return '#4CAF50';
    if (props.health > 30) return '#FFC107';
    return '#F44336';
  }};
  border-radius: 1rem;
  transition: background-color 0.3s ease;
`;

const HealthText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  z-index: 1;
`;

const MovesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-top: 2px solid rgba(255, 255, 255, 0.1);
`;

const MoveButton = styled(motion.button)<{ moveType: string }>`
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background: ${props => {
    const colors: { [key: string]: string } = {
      Fire: '#F08030',
      Water: '#6890F0',
      Grass: '#78C850',
      Electric: '#F8D030',
      Normal: '#A8A878',
      Fighting: '#C03028',
      Poison: '#A040A0',
      Ground: '#E0C068',
      Flying: '#A890F0',
      Psychic: '#F85888',
      Bug: '#A8B820',
      Rock: '#B8A038',
      Ghost: '#705898',
      Dragon: '#7038F8',
      Dark: '#705848',
      Steel: '#B8B8D0',
      Fairy: '#EE99AC',
      Ice: '#98D8D8'
    };
    return colors[props.moveType] || '#A8A878';
  }};
  color: white;
  font-size: 1rem;
  cursor: pointer;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const MoveInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  opacity: 0.9;
`;

const BattleMessage = styled.div<{ isEffectiveness?: boolean }>`
  font-size: 1.2rem;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  color: ${props => props.isEffectiveness ? '#ffd700' : 'white'};
  text-shadow: ${props => props.isEffectiveness ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none'};
  font-weight: ${props => props.isEffectiveness ? 'bold' : 'normal'};
`;

interface BattleProps {
  playerPokemon: Pokemon;
  opponentPokemon: Pokemon;
  onMoveSelect: (move: Move) => void;
  battleMessage: string;
  isPlayerTurn: boolean;
}

export const Battle: React.FC<BattleProps> = ({
  playerPokemon,
  opponentPokemon,
  onMoveSelect,
  battleMessage,
  isPlayerTurn
}) => {
  const isEffectivenessMessage = battleMessage.includes("It's super effective!") || 
                                battleMessage.includes("It's not very effective...")

  return (
    <BattleContainer>
      <BattleField>
        <PokemonContainer>
          <PokemonCard
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PokemonName>{playerPokemon.name}</PokemonName>
            <HealthBar>
              <HealthFill
                health={(playerPokemon.hp / playerPokemon.max_hp) * 100}
                initial={{ width: 0 }}
                animate={{ width: `${(playerPokemon.hp / playerPokemon.max_hp) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
              <HealthText>
                {playerPokemon.hp} / {playerPokemon.max_hp}
              </HealthText>
            </HealthBar>
          </PokemonCard>

          <PokemonCard
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PokemonName>{opponentPokemon.name}</PokemonName>
            <HealthBar>
              <HealthFill
                health={(opponentPokemon.hp / opponentPokemon.max_hp) * 100}
                initial={{ width: 0 }}
                animate={{ width: `${(opponentPokemon.hp / opponentPokemon.max_hp) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
              <HealthText>
                {opponentPokemon.hp} / {opponentPokemon.max_hp}
              </HealthText>
            </HealthBar>
          </PokemonCard>
        </PokemonContainer>

        <BattleMessage isEffectiveness={isEffectivenessMessage}>
          {battleMessage}
        </BattleMessage>

        <MovesContainer>
          {playerPokemon.moves.map((move, index) => (
            <MoveButton
              key={index}
              type="button"
              moveType={move.type}
              onClick={() => onMoveSelect(move)}
              disabled={!isPlayerTurn || move.pp <= 0}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {move.name}
              <MoveInfo>
                <span>PP: {move.pp}</span>
                <span>Power: {move.power}</span>
              </MoveInfo>
            </MoveButton>
          ))}
        </MovesContainer>
      </BattleField>
    </BattleContainer>
  );
}; 