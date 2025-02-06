import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

interface Level {
  u1: boolean
  u2: boolean
  u3: boolean
  u4: boolean
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
  level = {u1: false, u2: false, u3: false, u4: false};

  constructor(private quizService: QuizService) {
  }

  clearQuiz() {
    this.quizService.clearExistingQuiz();
  }

  quizInProgress(): boolean {
    return this.quizService.quizInProgress();
  }
}
