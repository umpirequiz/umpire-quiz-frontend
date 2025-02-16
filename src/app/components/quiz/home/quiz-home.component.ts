import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {SelectDifficultiesComponent} from "../select-difficulties/select-difficulties.component";
import {Levels} from "../../../domain/Levels";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    SelectDifficultiesComponent
  ],
  templateUrl: './quiz-home.component.html',
  styleUrl: './quiz-home.component.scss'
})
export class QuizHomeComponent {
  levels: Levels = {u1: false, u2: false, u3: false, u4: false}

  constructor(private quizService: QuizService, private cookieService: CookieService) {
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
