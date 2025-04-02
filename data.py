from typing import List, Dict, Optional
from dataclasses import dataclass
from enum import Enum

class Type(Enum):
    NORMAL = "Normal"
    FIRE = "Fire"
    WATER = "Water"
    ELECTRIC = "Electric"
    GRASS = "Grass"
    ICE = "Ice"
    FIGHTING = "Fighting"
    POISON = "Poison"
    GROUND = "Ground"
    FLYING = "Flying"
    PSYCHIC = "Psychic"
    BUG = "Bug"
    ROCK = "Rock"
    GHOST = "Ghost"
    DRAGON = "Dragon"
    DARK = "Dark"
    STEEL = "Steel"
    FAIRY = "Fairy"

@dataclass
class Move:
    name: str
    type: Type
    power: int
    accuracy: int
    pp: int
    description: str

@dataclass
class Pokemon:
    name: str
    level: int
    hp: int
    max_hp: int
    attack: int
    defense: int
    speed: int
    type1: Type
    type2: Optional[Type] = None
    moves: List[Move] = None
    status: Optional[str] = None

# Define all available moves
MOVES = {
    # Normal moves
    "Tackle": Move("Tackle", Type.NORMAL, 40, 100, 35, "A basic tackle attack"),
    "Scratch": Move("Scratch", Type.NORMAL, 40, 100, 35, "A basic scratch attack"),
    "Quick Attack": Move("Quick Attack", Type.NORMAL, 40, 100, 30, "A fast attack that always goes first"),
    "Body Slam": Move("Body Slam", Type.NORMAL, 85, 100, 15, "A powerful body slam that may paralyze"),
    
    # Fire moves
    "Ember": Move("Ember", Type.FIRE, 40, 100, 25, "A weak fire attack that may burn"),
    "Flame Burst": Move("Flame Burst", Type.FIRE, 70, 100, 15, "A powerful fire attack"),
    "Fire Spin": Move("Fire Spin", Type.FIRE, 35, 85, 15, "A spinning fire attack that may trap the target"),
    
    # Water moves
    "Water Gun": Move("Water Gun", Type.WATER, 40, 100, 25, "A weak water attack"),
    "Bubble Beam": Move("Bubble Beam", Type.WATER, 65, 100, 20, "A beam of bubbles that may lower speed"),
    "Hydro Pump": Move("Hydro Pump", Type.WATER, 110, 80, 5, "A powerful water attack"),
    
    # Grass moves
    "Vine Whip": Move("Vine Whip", Type.GRASS, 45, 100, 25, "A whip-like attack using vines"),
    "Razor Leaf": Move("Razor Leaf", Type.GRASS, 55, 95, 25, "Sharp leaves that may land critical hits"),
    "Solar Beam": Move("Solar Beam", Type.GRASS, 120, 100, 10, "A powerful beam of solar energy"),
    
    # Electric moves
    "Thunder Shock": Move("Thunder Shock", Type.ELECTRIC, 40, 100, 30, "A weak electric attack that may paralyze"),
    "Thunderbolt": Move("Thunderbolt", Type.ELECTRIC, 90, 100, 15, "A powerful electric attack that may paralyze"),
    "Thunder": Move("Thunder", Type.ELECTRIC, 110, 70, 10, "A powerful thunder attack that may paralyze"),
    
    # Psychic moves
    "Confusion": Move("Confusion", Type.PSYCHIC, 50, 100, 25, "A psychic attack that may confuse"),
    "Psybeam": Move("Psybeam", Type.PSYCHIC, 65, 100, 20, "A beam of psychic energy that may confuse"),
    "Psychic": Move("Psychic", Type.PSYCHIC, 90, 100, 10, "A powerful psychic attack that may lower special defense"),
}

# Define all available Pokemon
POKEMON = {
    "Charmander": Pokemon(
        name="Charmander",
        level=5,
        hp=39,
        max_hp=39,
        attack=52,
        defense=43,
        speed=65,
        type1=Type.FIRE,
        moves=[MOVES["Scratch"], MOVES["Ember"], MOVES["Flame Burst"], MOVES["Quick Attack"]]
    ),
    "Squirtle": Pokemon(
        name="Squirtle",
        level=5,
        hp=44,
        max_hp=44,
        attack=48,
        defense=65,
        speed=43,
        type1=Type.WATER,
        moves=[MOVES["Tackle"], MOVES["Water Gun"], MOVES["Bubble Beam"], MOVES["Quick Attack"]]
    ),
    "Bulbasaur": Pokemon(
        name="Bulbasaur",
        level=5,
        hp=45,
        max_hp=45,
        attack=49,
        defense=49,
        speed=45,
        type1=Type.GRASS,
        type2=Type.POISON,
        moves=[MOVES["Tackle"], MOVES["Vine Whip"], MOVES["Razor Leaf"], MOVES["Quick Attack"]]
    ),
    "Pikachu": Pokemon(
        name="Pikachu",
        level=5,
        hp=35,
        max_hp=35,
        attack=55,
        defense=40,
        speed=90,
        type1=Type.ELECTRIC,
        moves=[MOVES["Quick Attack"], MOVES["Thunder Shock"], MOVES["Thunderbolt"], MOVES["Body Slam"]]
    ),
    "Abra": Pokemon(
        name="Abra",
        level=5,
        hp=25,
        max_hp=25,
        attack=20,
        defense=15,
        speed=90,
        type1=Type.PSYCHIC,
        moves=[MOVES["Confusion"], MOVES["Psybeam"], MOVES["Quick Attack"], MOVES["Body Slam"]]
    ),
    "Geodude": Pokemon(
        name="Geodude",
        level=5,
        hp=40,
        max_hp=40,
        attack=80,
        defense=100,
        speed=20,
        type1=Type.ROCK,
        type2=Type.GROUND,
        moves=[MOVES["Tackle"], MOVES["Body Slam"], MOVES["Quick Attack"], MOVES["Scratch"]]
    ),
    "Pidgey": Pokemon(
        name="Pidgey",
        level=5,
        hp=40,
        max_hp=40,
        attack=45,
        defense=40,
        speed=56,
        type1=Type.NORMAL,
        type2=Type.FLYING,
        moves=[MOVES["Tackle"], MOVES["Quick Attack"], MOVES["Body Slam"], MOVES["Scratch"]]
    ),
    "Nidoran": Pokemon(
        name="Nidoran",
        level=5,
        hp=46,
        max_hp=46,
        attack=57,
        defense=40,
        speed=50,
        type1=Type.POISON,
        moves=[MOVES["Tackle"], MOVES["Quick Attack"], MOVES["Body Slam"], MOVES["Scratch"]]
    ),
}

def get_random_pokemon() -> Pokemon:
    """Get a random Pokemon from the available Pokemon."""
    import random
    return random.choice(list(POKEMON.values()))

def get_pokemon_by_name(name: str) -> Pokemon:
    """Get a Pokemon by its name."""
    return POKEMON.get(name) 