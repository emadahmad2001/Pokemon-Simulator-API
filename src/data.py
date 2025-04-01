from .models import Pokemon, Move, Type
import random

def create_moves():
    # Normal moves
    tackle = Move("Tackle", Type.NORMAL, 40, 100, 35, "A basic tackle attack")
    scratch = Move("Scratch", Type.NORMAL, 40, 100, 35, "A basic scratch attack")
    
    # Fire moves
    ember = Move("Ember", Type.FIRE, 40, 100, 25, "A weak fire attack")
    flame_burst = Move("Flame Burst", Type.FIRE, 70, 100, 15, "A powerful fire attack")
    
    # Water moves
    water_gun = Move("Water Gun", Type.WATER, 40, 100, 25, "A weak water attack")
    bubble_beam = Move("Bubble Beam", Type.WATER, 65, 100, 20, "A powerful water attack")
    
    # Grass moves
    vine_whip = Move("Vine Whip", Type.GRASS, 45, 100, 25, "A basic grass attack")
    razor_leaf = Move("Razor Leaf", Type.GRASS, 55, 95, 25, "A sharp leaf attack")
    
    # Electric moves
    thunder_shock = Move("Thunder Shock", Type.ELECTRIC, 40, 100, 30, "A weak electric attack")
    thunderbolt = Move("Thunderbolt", Type.ELECTRIC, 90, 100, 15, "A powerful electric attack")
    
    return {
        "tackle": tackle,
        "scratch": scratch,
        "ember": ember,
        "flame_burst": flame_burst,
        "water_gun": water_gun,
        "bubble_beam": bubble_beam,
        "vine_whip": vine_whip,
        "razor_leaf": razor_leaf,
        "thunder_shock": thunder_shock,
        "thunderbolt": thunderbolt
    }

def create_pokemon():
    moves = create_moves()
    
    # Starter Pokemon
    charmander = Pokemon(
        name="Charmander",
        level=5,
        hp=39,
        max_hp=39,
        attack=52,
        defense=43,
        speed=65,
        type1=Type.FIRE,
        moves=[moves["tackle"], moves["scratch"], moves["ember"], moves["flame_burst"]]
    )

    squirtle = Pokemon(
        name="Squirtle",
        level=5,
        hp=44,
        max_hp=44,
        attack=48,
        defense=65,
        speed=43,
        type1=Type.WATER,
        moves=[moves["tackle"], moves["scratch"], moves["water_gun"], moves["bubble_beam"]]
    )

    bulbasaur = Pokemon(
        name="Bulbasaur",
        level=5,
        hp=45,
        max_hp=45,
        attack=49,
        defense=49,
        speed=45,
        type1=Type.GRASS,
        moves=[moves["tackle"], moves["scratch"], moves["vine_whip"], moves["razor_leaf"]]
    )

    # Additional Pokemon
    pikachu = Pokemon(
        name="Pikachu",
        level=5,
        hp=35,
        max_hp=35,
        attack=55,
        defense=40,
        speed=90,
        type1=Type.ELECTRIC,
        moves=[moves["tackle"], moves["scratch"], moves["thunder_shock"], moves["thunderbolt"]]
    )

    eevee = Pokemon(
        name="Eevee",
        level=5,
        hp=55,
        max_hp=55,
        attack=55,
        defense=50,
        speed=55,
        type1=Type.NORMAL,
        moves=[moves["tackle"], moves["scratch"], moves["ember"], moves["water_gun"]]
    )

    return {
        "charmander": charmander,
        "squirtle": squirtle,
        "bulbasaur": bulbasaur,
        "pikachu": pikachu,
        "eevee": eevee
    }

def get_available_pokemon():
    """Returns a list of available Pokemon names"""
    return list(create_pokemon().keys())

def get_pokemon_by_name(name: str) -> Pokemon:
    """Returns a Pokemon instance by name"""
    pokemon = create_pokemon().get(name.lower())
    if not pokemon:
        raise ValueError(f"Pokemon {name} not found!")
    return Pokemon(**pokemon.__dict__)  # Create a new instance

def get_random_pokemon() -> Pokemon:
    """Returns a random Pokemon"""
    pokemon_list = list(create_pokemon().values())
    return random.choice(pokemon_list) 