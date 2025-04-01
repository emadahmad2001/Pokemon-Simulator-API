from .battle import Battle
from .data import get_available_pokemon, get_pokemon_by_name, get_random_pokemon

def display_pokemon_selection():
    print("\nAvailable Pokemon:")
    for i, pokemon in enumerate(get_available_pokemon(), 1):
        print(f"{i}. {pokemon.capitalize()}")
    
    while True:
        try:
            choice = int(input("\nSelect your Pokemon (enter number): "))
            if 1 <= choice <= len(get_available_pokemon()):
                pokemon_name = get_available_pokemon()[choice - 1]
                return get_pokemon_by_name(pokemon_name)
            print("Please enter a valid number!")
        except ValueError:
            print("Please enter a number!")

def main():
    print("Welcome to Pokemon Battle Simulator!")
    
    # Player selects their Pokemon
    player_pokemon = display_pokemon_selection()
    print(f"\nYou chose {player_pokemon.name}!")
    
    # Opponent gets a random Pokemon
    opponent_pokemon = get_random_pokemon()
    print(f"Your opponent has {opponent_pokemon.name}!")
    
    # Start the battle
    battle = Battle(player_pokemon, opponent_pokemon)
    
    while True:
        if not battle.battle_turn():
            print("\nBattle ended by player!")
            break
            
        winner = battle.check_battle_end()
        if winner:
            if winner == "player":
                print(f"\nCongratulations! {player_pokemon.name} wins!")
            else:
                print(f"\n{opponent_pokemon.name} wins!")
            break

if __name__ == "__main__":
    main() 