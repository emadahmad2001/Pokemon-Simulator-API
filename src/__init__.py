"""
Pokemon Battle Simulator
A Python-based Pokemon battle simulator that allows you to experience turn-based Pokemon battles in the terminal.
"""

from .models import Pokemon, Move, Type
from .battle import Battle
from .data import get_available_pokemon, get_pokemon_by_name, get_random_pokemon

__version__ = "0.1.0" 