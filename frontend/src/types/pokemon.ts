export enum Type {
    NORMAL = "Normal",
    FIRE = "Fire",
    WATER = "Water",
    ELECTRIC = "Electric",
    GRASS = "Grass",
    ICE = "Ice",
    FIGHTING = "Fighting",
    POISON = "Poison",
    GROUND = "Ground",
    FLYING = "Flying",
    PSYCHIC = "Psychic",
    BUG = "Bug",
    ROCK = "Rock",
    GHOST = "Ghost",
    DRAGON = "Dragon",
    DARK = "Dark",
    STEEL = "Steel",
    FAIRY = "Fairy"
}

export interface Move {
    name: string;
    type: Type;
    power: number;
    accuracy: number;
    pp: number;
    description: string;
}

export interface Pokemon {
    name: string;
    level: number;
    hp: number;
    max_hp: number;
    attack: number;
    defense: number;
    speed: number;
    type1: Type;
    type2?: Type;
    moves: Move[];
    status?: string;
} 