import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GameState, Question} from "../../../domain/Question";
import {FormsModule} from "@angular/forms";
import {Lang} from "./Lang";
import {GameStateComponent} from "../game-state/game-state.component";
import {I18nService} from "../../../services/i18n.service";

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
export class QuestionComponent implements OnInit, OnChanges {
  @Input() question!: Question;
  @Input() gameState!: GameState;
  @Input() edit!: boolean;

  protected readonly Lang = Lang;
  questionTranslatedValue = "";

  constructor(private i18nService: I18nService) {
  }

  ngOnInit(): void {
    this.updateI18nValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question'] && !changes['question'].isFirstChange()) {
      this.updateI18nValue();
    }
  }

  private updateI18nValue(): void {
    this.questionTranslatedValue = this.i18nService.translate(this.question);
  }

  get currentGameState(): GameState {
    return this.gameState;
  }
}
