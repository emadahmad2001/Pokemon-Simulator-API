# Pokemon Battle Simulator

A Python-based Pokemon battle simulator that allows you to experience turn-based Pokemon battles in the terminal. This project simulates Pokemon battles with various moves, types, and status effects.

## Features

- Turn-based battle system
- Multiple Pokemon types with type advantages
- Various moves with different effects
- Status effects (Poison, Burn, Sleep, etc.)
- HP and PP management
- Battle statistics tracking

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/emadahmad2001/pokemon-battle-simulator.git
    cd pokemon-battle-simulator
    ```

2. Create a virtual environment (recommended):

    ```bash
    python -m venv venv
    # On Windows
    venv\Scripts\activate
    # On Unix or MacOS
    source venv/bin/activate
    ```

3. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

## How to Run

1. Make sure you have activated your virtual environment (if you created one)
2. Run the game:

    ```bash
    python -m src.main
    ```

## Project Structure

```
Pokemon-Simulator-API/
├── src/
│   ├── __init__.py
│   ├── main.py
│   ├── models.py
│   ├── battle.py
│   └── data.py
├── requirements.txt
└── README.md
```

## Game Features

### Battle System
- Turn-based combat based on Pokemon speed
- 4 moves per Pokemon with PP (Power Points) management
- Damage calculation based on Pokemon stats
- Simple AI for the opponent

### Current Pokemon
- Charmander (Fire type)
- Squirtle (Water type)

### Available Moves
- Tackle (Normal type)
- Scratch (Normal type)
- Ember (Fire type)
- Water Gun (Water type)

## Game Controls

- Use number keys (1-4) to select moves
- Press '0' to quit the game
- Follow on-screen prompts for battle actions

## Contributing

Feel free to submit issues and enhancement requests!