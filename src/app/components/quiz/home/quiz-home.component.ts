import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {SelectDifficultiesComponent} from "../select-difficulties/select-difficulties.component";
import {anySelected, Levels} from "../../../domain/Levels";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SelectDifficultiesComponent
  ],
  templateUrl: './quiz-home.component.html',
  styleUrl: './quiz-home.component.scss'
})
export class QuizHomeComponent {
  levels: Levels = {u1: true, u2: true, u3: true, u4: true}
  protected message = "";

  constructor(private quizService: QuizService,
              private cookieService: CookieService,
              private router: Router) {
    let cookieLevels = this.cookieService.get("levels");
    if (cookieLevels) {
      this.levels = JSON.parse(cookieLevels)
    }
  }

  newQuiz() {
    if (anySelected(this.levels)) {
      this.quizService.startNewQuiz(this.levels);
      this.play()
    } else {
      this.message = $localize`:@@quiz.home.select.difficulty:Select at least one difficulty.`;
    }
  }

  play() {
    this.router.navigate(['/quiz/play'])
  }


  quizInProgress(): boolean {
    return this.quizService.quizInProgress();
  }
}
