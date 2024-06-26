import {Component, Input} from '@angular/core';
import {GameState} from "../../../domain/Question";

@Component({
  selector: 'app-game-state',
  standalone: true,
  imports: [],
  templateUrl: './game-state.component.html',
  styleUrl: './game-state.component.scss'
})
export class GameStateComponent {
  @Input() gameState!: GameState

  get currentGameState(): GameState {
    return this.gameState
  }
}
