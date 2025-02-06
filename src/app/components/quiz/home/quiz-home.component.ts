import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";

export interface Levels {
  u1: boolean
  u2: boolean
  u3: boolean
  u4: boolean
}

export function toCode(levels: Levels): string {
  return levels?.u1 ? '1' : ''
    .concat(levels?.u2 ? '2' : '')
    .concat(levels?.u3 ? '3' : '')
    .concat(levels?.u4 ? '4' : '')
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './quiz-home.component.html',
  styleUrl: './quiz-home.component.scss'
})
export class QuizHomeComponent {
  levels: Levels;

  constructor(private quizService: QuizService, private cookieService: CookieService) {
    this.levels = {u1: false, u2: false, u3: false, u4: false}
    let cookieLevels = this.cookieService.get("levels");
    if (cookieLevels) {
      this.levels = JSON.parse(cookieLevels)
    }
  }

  newQuiz() {
    this.quizService.startNewQuiz(this.levels);
  }

  quizInProgress(): boolean {
    return this.quizService.quizInProgress();
  }
}
