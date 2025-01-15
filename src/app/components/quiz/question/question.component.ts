import {Component, Input} from '@angular/core';
import {GameState, Question} from "../../../domain/Question";
import {FormsModule} from "@angular/forms";
import {Lang} from "./Lang";
import {GameStateComponent} from "../game-state/game-state.component";

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    FormsModule,
    GameStateComponent
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  @Input() question!: Question
  @Input() gameState!: GameState
  @Input() edit!: boolean;

  protected readonly Lang = Lang;

  get currentGameState(): GameState {
    return this.gameState
  }
}
