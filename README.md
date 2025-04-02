# Pokémon Battle Simulator

A web-based Pokémon battle simulator that lets you battle with your favorite Pokémon! Built with React, TypeScript, and FastAPI.

## Features

- Choose from 6 different Pokémon (Charmander, Bulbasaur, Squirtle, Pikachu, Abra, and Geodude)
- Battle against a randomly selected opponent
- Type-based damage calculation with effectiveness messages
- Beautiful, responsive UI with animations
- Battle results screen with winner statistics
- Play again functionality

## Screenshots

### Pokémon Selection Screen
![Pokémon Selection](./screenshots/selection.png)

### Battle Results Screen
![Battle Results](./screenshots/results.png)

## Project Structure

```
Pokemon-Simulator-API/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   └── data.py
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Battle.tsx
│   │   │   ├── PokemonSelection.tsx
│   │   │   └── BattleResults.tsx
│   │   ├── types/
│   │   │   └── pokemon.ts
│   │   ├── App.tsx
│   │   ├── data.ts
│   │   └── index.css
│   ├── package.json
│   └── README.md
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## Contributing

# Pokemon Battle Simulator

A full-stack Pokemon battle simulator with a Python backend and React frontend. Battle against AI opponents using your favorite Pokemon!

## Features

- Turn-based Pokemon battles
- Multiple Pokemon selection
- Type-based damage calculation
- Modern, responsive UI with animations
- Real-time battle updates
- Health bars and move selection interface

## Project Structure

```
Pokemon-Simulator-API/
├── main.py              # Backend battle logic
├── data.py             # Pokemon data and moves
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── types/      # TypeScript type definitions
│   │   └── App.tsx     # Main application component
│   └── package.json    # Frontend dependencies
└── requirements.txt    # Backend dependencies
```

## Setup

### Backend Setup

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the backend:
```bash
python main.py
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## How to Play

1. Start the application and you'll see the Pokemon selection screen
2. Choose your Pokemon from the available options
3. Enter battle against an AI opponent
4. Select moves during your turn
5. Watch the battle unfold with animations and health updates
6. Win or lose, you can start a new battle!

## Available Pokemon

Currently implemented Pokemon:
- Charmander (Fire)
- Squirtle (Water)

More Pokemon will be added in future updates!

## Development

### Adding New Pokemon

To add new Pokemon, update the `data.py` file with the Pokemon's stats and moves.

### Adding New Features

1. Backend changes:
   - Modify `main.py` for battle logic
   - Update `data.py` for Pokemon data

2. Frontend changes:
   - Add new components in `frontend/src/components/`
   - Update types in `frontend/src/types/`
   - Modify `App.tsx` for game logic

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request