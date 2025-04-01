from .models import Pokemon, Move, Type

def create_sample_pokemon():
    # Create some sample moves
    tackle = Move("Tackle", Type.NORMAL, 40, 100, 35, "A basic tackle attack")
    scratch = Move("Scratch", Type.NORMAL, 40, 100, 35, "A basic scratch attack")
    ember = Move("Ember", Type.FIRE, 40, 100, 25, "A weak fire attack")
    water_gun = Move("Water Gun", Type.WATER, 40, 100, 25, "A weak water attack")

    # Create sample Pokemon
    charmander = Pokemon(
        name="Charmander",
        level=5,
        hp=39,
        max_hp=39,
        attack=52,
        defense=43,
        speed=65,
        type1=Type.FIRE,
        moves=[tackle, scratch, ember, water_gun]
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
        moves=[tackle, scratch, water_gun, ember]
    )

    return charmander, squirtle 