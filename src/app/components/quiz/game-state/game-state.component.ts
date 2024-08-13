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

  runners(): string {
    let gs = this.gameState;
    let runners: string[] = []

    let rs = [gs.runnerBase1, gs.runnerBase2, gs.runnerBase3];
    rs.forEach((r, index) => {
      if (r) runners.push(`R${index + 1}`);
    })

    return runners.length == 0 ? "No runners" : runners.join(', ')
  }

}
