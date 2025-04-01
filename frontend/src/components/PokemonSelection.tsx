import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Pokemon } from '../types/pokemon';

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #1a237e, #0d47a1);
  min-height: 100vh;
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
`;

const PokemonCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const PokemonName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
`;

const TypeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TypeBadge = styled.span<{ type: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  background: ${props => {
    const colors: { [key: string]: string } = {
      Fire: '#f44336',
      Water: '#2196f3',
      Grass: '#4caf50',
      Electric: '#ffc107',
      Normal: '#9e9e9e',
      Fighting: '#795548',
      Poison: '#9c27b0',
      Ground: '#8d6e63',
      Flying: '#90caf9',
      Psychic: '#e91e63',
      Bug: '#8bc34a',
      Rock: '#607d8b',
      Ghost: '#673ab7',
      Dragon: '#3f51b5',
      Dark: '#424242',
      Steel: '#bdbdbd',
      Fairy: '#f48fb1',
      Ice: '#00bcd4'
    };
    return colors[props.type] || '#9e9e9e';
  }};
  color: white;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
`;

interface PokemonSelectionProps {
  pokemon: Pokemon[];
  onSelect: (pokemon: Pokemon) => void;
}

export const PokemonSelection: React.FC<PokemonSelectionProps> = ({
  pokemon,
  onSelect
}) => {
  return (
    <SelectionContainer>
      <Title>Choose Your Pokémon</Title>
      <PokemonGrid>
        {pokemon.map((pkmn, index) => (
          <PokemonCard
            key={index}
            onClick={() => onSelect(pkmn)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PokemonName>{pkmn.name}</PokemonName>
            <TypeContainer>
              <TypeBadge type={pkmn.type1}>{pkmn.type1}</TypeBadge>
              {pkmn.type2 && <TypeBadge type={pkmn.type2}>{pkmn.type2}</TypeBadge>}
            </TypeContainer>
            <StatsContainer>
              <StatItem>
                <span>HP:</span>
                <span>{pkmn.hp}</span>
              </StatItem>
              <StatItem>
                <span>Attack:</span>
                <span>{pkmn.attack}</span>
              </StatItem>
              <StatItem>
                <span>Defense:</span>
                <span>{pkmn.defense}</span>
              </StatItem>
              <StatItem>
                <span>Speed:</span>
                <span>{pkmn.speed}</span>
              </StatItem>
            </StatsContainer>
          </PokemonCard>
        ))}
      </PokemonGrid>
    </SelectionContainer>
  );
}; 