import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './quiz-home.component.html',
  styleUrl: './quiz-home.component.scss'
})
export class QuizHomeComponent {
  constructor(private quizService: QuizService) {
  }

  clearQuiz() {
    this.quizService.clearExistingQuiz();
  }

  quizInProgress(): boolean {
    return this.quizService.quizInProgress();
  }
}
