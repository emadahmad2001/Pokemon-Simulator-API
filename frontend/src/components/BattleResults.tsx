import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { Pokemon } from '../types/pokemon'

const ResultsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7));
  color: white;
  text-align: center;
`

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  color: ${props => props.color || 'white'};
`

const WinnerCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
`

const PokemonName = styled.h2`
  font-size: 2rem;
  margin: 1rem 0;
  color: ${props => props.color || 'white'};
`

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`

const StatItem = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  border-radius: 10px;
  font-size: 0.9rem;
`

const Button = styled(motion.button)`
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: white;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
  }

  &:active {
    transform: translateY(1px);
  }
`

interface BattleResultsProps {
  winner: Pokemon
  onPlayAgain: () => void
}

export const BattleResults: React.FC<BattleResultsProps> = ({ winner, onPlayAgain }) => {
  return (
    <ResultsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Title color="#ffd700">Battle Results!</Title>
      
      <WinnerCard
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <PokemonName color="#ffd700">{winner.name} is victorious!</PokemonName>
        
        <StatsContainer>
          <StatItem>Level: {winner.level}</StatItem>
          <StatItem>HP: {winner.hp}/{winner.max_hp}</StatItem>
          <StatItem>Attack: {winner.attack}</StatItem>
          <StatItem>Defense: {winner.defense}</StatItem>
          <StatItem>Speed: {winner.speed}</StatItem>
          <StatItem>Type: {winner.type1}</StatItem>
        </StatsContainer>
      </WinnerCard>

      <Button
        onClick={onPlayAgain}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Battle Again!
      </Button>
    </ResultsContainer>
  )
} 