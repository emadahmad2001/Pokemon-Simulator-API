import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Pokemon } from '../types/pokemon';

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
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

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
`;

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1400px;
  padding: 1rem;
  position: relative;
  z-index: 1;
`;

const PokemonCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  cursor: pointer;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
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

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);

    &::before {
      transform: translateX(100%);
    }
  }
`;

const PokemonName = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const TypeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TypeBadge = styled.span<{ type: string }>`
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
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
    return colors[props.type] || '#A8A878';
  }};
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 0.5rem;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const LevelBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LevelBadge>Lvl {pkmn.level}</LevelBadge>
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