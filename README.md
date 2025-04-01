# Pokémon Battle Game

This is a simple Pokémon battle game implemented in Python. Players choose their Pokémon and take turns attacking each other until one Pokémon's HP reaches zero. The game uses the PokéAPI to fetch Pokémon data and their available moves.

## Features

- Fetch Pokémon data and moves from the PokéAPI.
- Randomly select Pokémon for players to choose from.
- Turn-based attack system with random damage calculation.
- Determine the winner based on the remaining HP.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/emadahmad2001/pokemon-battle-game.git
    cd pokemon-battle-game
    ```

2. Install the required dependencies:

    ```bash
    pip install requests
    ```

## How to Play

1. Run the game script:

    ```bash
    python pokemon_battle.py
    ```

2. Player 1 chooses their Pokémon from the list of three randomly selected Pokémon.
3. Player 2 chooses their Pokémon from another list of three randomly selected Pokémon.
4. Players take turns attacking each other by choosing a move from the available moves.
5. The game continues until one of the Pokémon's HP reaches zero.
6. The player with the remaining HP wins the game.

## Example Gameplay

```python
Player 1, choose your Pokémon:
1. bulbasaur
2. charmander
3. squirtle
Enter the number of your chosen Pokémon: 1

Player 2, choose your Pokémon:
1. pikachu
2. jigglypuff
3. meowth
Enter the number of your chosen Pokémon: 2

bulbasaur's HP: 100
pikachu's HP: 100

Player 1's turn:
1. tackle
2. vine-whip
3. growl
4. leech-seed
Enter the number of your chosen move: 2
bulbasaur uses vine-whip on pikachu for 15 damage!

bulbasaur's HP: 100
pikachu's HP: 85

Player 2's turn:
1. thunder-shock
2. quick-attack
3. growl
4. tail-whip
Enter the number of your chosen move: 1
pikachu uses thunder-shock on bulbasaur for 18 damage!

bulbasaur's HP: 82
pikachu's HP: 85

...

bulbasaur wins!
```
