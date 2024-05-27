import requests
import random

class Pokemon:
    def __init__(self, name):
        self.name = name
        self.data = requests.get(f"https://pokeapi.co/api/v2/pokemon/{name.lower()}").json()
        self.moves = [move["move"]["name"] for move in self.data["moves"]]
        self.hp = 100

    def attack(self, other, move):
        damage = random.randint(10, 20)
        other.hp -= damage
        print(f"{self.name} uses {move} on {other.name} for {damage} damage!")

    def is_alive(self):
        return self.hp > 0

def get_pokemon():
    pokemons = requests.get("https://pokeapi.co/api/v2/pokemon?limit=1000").json()["results"]
    return [Pokemon(pokemon["name"]) for pokemon in random.sample(pokemons, 3)]

def main():
    print("Player 1, choose your Pokémon:")
    pokemons = get_pokemon()
    for i, pokemon in enumerate(pokemons):
        print(f"{i+1}. {pokemon.name}")
    choice = int(input("Enter the number of your chosen Pokémon: "))
    player1_pokemon = pokemons[choice-1]

    print("\nPlayer 2, choose your Pokémon:")
    pokemons = get_pokemon()
    for i, pokemon in enumerate(pokemons):
        print(f"{i+1}. {pokemon.name}")
    choice = int(input("Enter the number of your chosen Pokémon: "))
    player2_pokemon = pokemons[choice-1]

    while player1_pokemon.is_alive() and player2_pokemon.is_alive():
        print(f"\n{player1_pokemon.name}'s HP: {player1_pokemon.hp}")
        print(f"{player2_pokemon.name}'s HP: {player2_pokemon.hp}")
        print("\nPlayer 1's turn:")
        for i, move in enumerate(player1_pokemon.moves[:4]):
            print(f"{i+1}. {move}")
        choice = int(input("Enter the number of your chosen move: "))
        player1_pokemon.attack(player2_pokemon, player1_pokemon.moves[choice-1])
        if not player2_pokemon.is_alive():
            break

        print(f"\n{player1_pokemon.name}'s HP: {player1_pokemon.hp}")
        print(f"{player2_pokemon.name}'s HP: {player2_pokemon.hp}")
        print("\nPlayer 2's turn:")
        for i, move in enumerate(player2_pokemon.moves[:4]):
            print(f"{i+1}. {move}")
        choice = int(input("Enter the number of your chosen move: "))
        player2_pokemon.attack(player1_pokemon, player2_pokemon.moves[choice-1])

    if player1_pokemon.is_alive():
        print(f"\n{player1_pokemon.name} wins!")
    else:
        print(f"\n{player2_pokemon.name} wins!")

if __name__ == "__main__":
    main()
