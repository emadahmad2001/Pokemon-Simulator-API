import { Pokemon, Move, Type } from './types/pokemon';

const moves: { [key: string]: Move } = {
  Scratch:      { name: 'Scratch',       type: Type.NORMAL,   power: 40,  accuracy: 100, pp: 35, description: 'A basic scratch attack.' },
  Tackle:       { name: 'Tackle',        type: Type.NORMAL,   power: 40,  accuracy: 100, pp: 35, description: 'A basic tackle attack.' },
  QuickAttack:  { name: 'Quick Attack',  type: Type.NORMAL,   power: 40,  accuracy: 100, pp: 30, description: 'A fast attack that always goes first.' },
  BodySlam:     { name: 'Body Slam',     type: Type.NORMAL,   power: 85,  accuracy: 100, pp: 15, description: 'A powerful slam that may paralyze.' },
  Ember:        { name: 'Ember',         type: Type.FIRE,     power: 40,  accuracy: 100, pp: 25, description: 'A weak fire attack that may burn.' },
  FlameBurst:   { name: 'Flame Burst',   type: Type.FIRE,     power: 70,  accuracy: 100, pp: 15, description: 'A burst of flames that scorches.' },
  WaterGun:     { name: 'Water Gun',     type: Type.WATER,    power: 40,  accuracy: 100, pp: 25, description: 'A weak water attack.' },
  BubbleBeam:   { name: 'Bubble Beam',   type: Type.WATER,    power: 65,  accuracy: 100, pp: 20, description: 'A beam of bubbles that may lower speed.' },
  VineWhip:     { name: 'Vine Whip',     type: Type.GRASS,    power: 45,  accuracy: 100, pp: 25, description: 'A whip-like attack using vines.' },
  RazorLeaf:    { name: 'Razor Leaf',    type: Type.GRASS,    power: 55,  accuracy: 95,  pp: 25, description: 'Sharp leaves that may crit.' },
  PoisonPowder: { name: 'Poison Powder', type: Type.POISON,   power: 0,   accuracy: 75,  pp: 35, description: 'A powder that may poison.' },
  ThunderShock: { name: 'Thunder Shock', type: Type.ELECTRIC, power: 40,  accuracy: 100, pp: 30, description: 'A weak electric attack.' },
  Thunderbolt:  { name: 'Thunderbolt',   type: Type.ELECTRIC, power: 90,  accuracy: 100, pp: 15, description: 'A powerful electric attack.' },
  BodySlam2:    { name: 'Body Slam',     type: Type.NORMAL,   power: 85,  accuracy: 100, pp: 15, description: 'A powerful slam.' },
  Confusion:    { name: 'Confusion',     type: Type.PSYCHIC,  power: 50,  accuracy: 100, pp: 25, description: 'A psychic attack that may confuse.' },
  Psybeam:      { name: 'Psybeam',       type: Type.PSYCHIC,  power: 65,  accuracy: 100, pp: 20, description: 'A beam of psychic energy.' },
  Psychic:      { name: 'Psychic',       type: Type.PSYCHIC,  power: 90,  accuracy: 100, pp: 10, description: 'A powerful psychic attack.' },
  RockThrow:    { name: 'Rock Throw',    type: Type.ROCK,     power: 50,  accuracy: 90,  pp: 15, description: 'A rock hurled at the target.' },
  RockSlide:    { name: 'Rock Slide',    type: Type.ROCK,     power: 75,  accuracy: 90,  pp: 10, description: 'Large rocks flung at the foe.' },
  Magnitude:    { name: 'Magnitude',     type: Type.GROUND,   power: 70,  accuracy: 100, pp: 30, description: 'A ground-shaking attack.' },
};

const pokemonData: { [key: string]: Pokemon } = {
  Charmander: {
    name: 'Charmander', level: 5, hp: 39, max_hp: 39,
    attack: 52, defense: 43, speed: 65, type1: Type.FIRE,
    moves: [moves.Scratch, moves.Ember, moves.FlameBurst, moves.QuickAttack],
  },
  Bulbasaur: {
    name: 'Bulbasaur', level: 5, hp: 45, max_hp: 45,
    attack: 49, defense: 49, speed: 45, type1: Type.GRASS, type2: Type.POISON,
    moves: [moves.Tackle, moves.VineWhip, moves.RazorLeaf, moves.PoisonPowder],
  },
  Squirtle: {
    name: 'Squirtle', level: 5, hp: 44, max_hp: 44,
    attack: 48, defense: 65, speed: 43, type1: Type.WATER,
    moves: [moves.Tackle, moves.WaterGun, moves.BubbleBeam, moves.QuickAttack],
  },
  Pikachu: {
    name: 'Pikachu', level: 5, hp: 35, max_hp: 35,
    attack: 55, defense: 40, speed: 90, type1: Type.ELECTRIC,
    moves: [moves.QuickAttack, moves.ThunderShock, moves.Thunderbolt, moves.BodySlam2],
  },
  Abra: {
    name: 'Abra', level: 5, hp: 25, max_hp: 25,
    attack: 20, defense: 15, speed: 90, type1: Type.PSYCHIC,
    moves: [moves.Confusion, moves.Psybeam, moves.Psychic, moves.QuickAttack],
  },
  Geodude: {
    name: 'Geodude', level: 5, hp: 40, max_hp: 40,
    attack: 80, defense: 100, speed: 20, type1: Type.ROCK, type2: Type.GROUND,
    moves: [moves.Tackle, moves.RockThrow, moves.RockSlide, moves.Magnitude],
  },
};

const clonePokemon = (p: Pokemon): Pokemon => ({
  ...p,
  moves: p.moves.map(m => ({ ...m })),
});

export const getPokemonByName = (name: string): Pokemon => {
  const pokemon = pokemonData[name];
  if (!pokemon) throw new Error(`Pokemon ${name} not found`);
  return clonePokemon(pokemon);
};

export const getRandomPokemon = (): Pokemon => {
  const names = Object.keys(pokemonData);
  return getPokemonByName(names[Math.floor(Math.random() * names.length)]);
};