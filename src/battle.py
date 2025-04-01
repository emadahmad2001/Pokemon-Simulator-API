from typing import Optional
from .models import Pokemon, Move
import random

class Battle:
    def __init__(self, player_pokemon: Pokemon, opponent_pokemon: Pokemon):
        self.player_pokemon = player_pokemon
        self.opponent_pokemon = opponent_pokemon
        self.is_player_turn = player_pokemon.speed >= opponent_pokemon.speed

    def display_status(self):
        print("\n" + "="*50)
        print(f"Your Pokemon: {self.player_pokemon.name} (HP: {self.player_pokemon.hp}/{self.player_pokemon.max_hp})")
        print(f"Opponent's Pokemon: {self.opponent_pokemon.name} (HP: {self.opponent_pokemon.hp}/{self.opponent_pokemon.max_hp})")
        print("="*50 + "\n")

    def display_moves(self, pokemon: Pokemon):
        print("\nAvailable moves:")
        for i, move in enumerate(pokemon.moves, 1):
            print(f"{i}. {move.name} (PP: {move.pp}) - {move.description}")

    def calculate_damage(self, attacker: Pokemon, defender: Pokemon, move: Move) -> int:
        # Basic damage calculation formula
        base_damage = ((2 * attacker.level / 5 + 2) * move.power * attacker.attack / defender.defense) / 50 + 2
        # Type effectiveness (simplified)
        type_multiplier = 1.0  # In a full implementation, this would be calculated based on type matchups
        return int(base_damage * type_multiplier)

    def execute_move(self, attacker: Pokemon, defender: Pokemon, move: Move):
        if move.pp <= 0:
            print(f"{move.name} has no PP left!")
            return False

        # Calculate damage
        damage = self.calculate_damage(attacker, defender, move)
        
        # Apply damage
        defender.hp = max(0, defender.hp - damage)
        
        # Reduce PP
        move.pp -= 1
        
        print(f"{attacker.name} used {move.name}!")
        print(f"It dealt {damage} damage to {defender.name}!")
        
        return True

    def battle_turn(self):
        if self.is_player_turn:
            self.display_status()
            self.display_moves(self.player_pokemon)
            
            while True:
                try:
                    choice = int(input("\nSelect a move (1-4) or 0 to quit: "))
                    if choice == 0:
                        return False
                    if 1 <= choice <= len(self.player_pokemon.moves):
                        move = self.player_pokemon.moves[choice - 1]
                        if self.execute_move(self.player_pokemon, self.opponent_pokemon, move):
                            break
                except ValueError:
                    print("Please enter a valid number!")
        else:
            # Simple AI for opponent
            move = random.choice(self.opponent_pokemon.moves)
            self.execute_move(self.opponent_pokemon, self.player_pokemon, move)
        
        self.is_player_turn = not self.is_player_turn
        return True

    def check_battle_end(self) -> Optional[str]:
        if self.player_pokemon.hp <= 0:
            return "opponent"
        if self.opponent_pokemon.hp <= 0:
            return "player"
        return None 