from typing import List, Optional
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