import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Quiz} from "../domain/Quiz";
import {EnvironmentService} from "./environment.service";
import {QuizProgress} from "../domain/QuizProgress";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl!: string

  constructor(private httpClient: HttpClient, private environmentService: EnvironmentService) {
    this.environmentService.env.subscribe(e =>
      this.baseUrl = e.questionServiceUrl + '/quizzes'
    )
  }

  getQuiz(): Observable<Quiz> {
    return this.httpClient.get<Quiz>(this.baseUrl)
  }

  clearExistingQuiz() {
    if (this.quizInProgress()) {
      sessionStorage.removeItem('activeQuiz');
    }
  }

  quizInProgress(): boolean {
    return sessionStorage.getItem('activeQuiz') !== null;
  }

  getQuizResults(): Quiz {
    return JSON.parse(sessionStorage.getItem('lastResult') ?? "");
  }

  postQuizResults(quiz: Quiz) {
    this.httpClient.post<Quiz>(this.baseUrl, quiz).subscribe(data => sessionStorage.setItem('lastResult', JSON.stringify(data)))
  }

  countAnsweredQuestions(): number {
    let activeQuiz = QuizService.activeQuiz().quiz;
    let count: number = 0;
    for (let question of activeQuiz.questions) {
      if (question.selectedAnswer !== undefined) {
        count++;
      }
    }
    return count;
  }

  allAnswered() {
    if (!this.quizInProgress()) return false;
    return (this.countAnsweredQuestions() == QuizService.activeQuiz().quiz.questions.length)
  }

  static activeQuiz(): QuizProgress {
    return JSON.parse(sessionStorage.getItem('activeQuiz') ?? '{}');
  }
}
