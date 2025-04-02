import { Pokemon, Move, Type } from './types/pokemon';

const moves: { [key: string]: Move } = {
  Scratch: {
    name: 'Scratch',
    type: Type.NORMAL,
    power: 40,
    accuracy: 100,
    pp: 35,
    description: 'A basic attack that scratches the target.'
  },
  Ember: {
    name: 'Ember',
    type: Type.FIRE,
    power: 40,
    accuracy: 100,
    pp: 25,
    description: 'A weak fire attack that may burn the target.'
  },
  WaterGun: {
    name: 'Water Gun',
    type: Type.WATER,
    power: 40,
    accuracy: 100,
    pp: 25,
    description: 'A weak water attack that may soak the target.'
  },
  VineWhip: {
    name: 'Vine Whip',
    type: Type.GRASS,
    power: 45,
    accuracy: 100,
    pp: 25,
    description: 'A weak grass attack that may whip the target.'
  },
  ThunderShock: {
    name: 'Thunder Shock',
    type: Type.ELECTRIC,
    power: 40,
    accuracy: 100,
    pp: 30,
    description: 'A weak electric attack that may paralyze the target.'
  },
  Confusion: {
    name: 'Confusion',
    type: Type.PSYCHIC,
    power: 50,
    accuracy: 100,
    pp: 25,
    description: 'A psychic attack that may confuse the target.'
  },
  RockThrow: {
    name: 'Rock Throw',
    type: Type.ROCK,
    power: 50,
    accuracy: 90,
    pp: 15,
    description: 'A rock attack that may hit hard.'
  },
  QuickAttack: {
    name: 'Quick Attack',
    type: Type.NORMAL,
    power: 40,
    accuracy: 100,
    pp: 30,
    description: 'A fast attack that always goes first.'
  }
};

const pokemonData: { [key: string]: Pokemon } = {
  Charmander: {
    name: 'Charmander',
    level: 5,
    hp: 39,
    max_hp: 39,
    attack: 52,
    defense: 43,
    speed: 65,
    type1: Type.FIRE,
    moves: [moves.Scratch, moves.Ember]
  },
  Bulbasaur: {
    name: 'Bulbasaur',
    level: 5,
    hp: 45,
    max_hp: 45,
    attack: 49,
    defense: 49,
    speed: 45,
    type1: Type.GRASS,
    type2: Type.POISON,
    moves: [moves.Scratch, moves.VineWhip]
  },
  Squirtle: {
    name: 'Squirtle',
    level: 5,
    hp: 44,
    max_hp: 44,
    attack: 48,
    defense: 65,
    speed: 43,
    type1: Type.WATER,
    moves: [moves.Scratch, moves.WaterGun]
  },
  Pikachu: {
    name: 'Pikachu',
    level: 5,
    hp: 35,
    max_hp: 35,
    attack: 55,
    defense: 40,
    speed: 90,
    type1: Type.ELECTRIC,
    moves: [moves.QuickAttack, moves.ThunderShock]
  },
  Abra: {
    name: 'Abra',
    level: 5,
    hp: 25,
    max_hp: 25,
    attack: 20,
    defense: 15,
    speed: 90,
    type1: Type.PSYCHIC,
    moves: [moves.QuickAttack, moves.Confusion]
  },
  Geodude: {
    name: 'Geodude',
    level: 5,
    hp: 40,
    max_hp: 40,
    attack: 80,
    defense: 100,
    speed: 20,
    type1: Type.ROCK,
    type2: Type.GROUND,
    moves: [moves.RockThrow, moves.QuickAttack]
  }
};

export const getPokemonByName = (name: string): Pokemon => {
  const pokemon = pokemonData[name];
  if (!pokemon) {
    throw new Error(`Pokemon ${name} not found`);
  }
  return { ...pokemon };
};

export const getRandomPokemon = (): Pokemon => {
  const names = Object.keys(pokemonData);
  const randomName = names[Math.floor(Math.random() * names.length)];
  return getPokemonByName(randomName);
}; 