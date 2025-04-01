from .battle import Battle
from .data import create_sample_pokemon

def main():
    print("Welcome to Pokemon Battle Simulator!")
    print("Let's start a battle between Charmander and Squirtle!")
    
    player_pokemon, opponent_pokemon = create_sample_pokemon()
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