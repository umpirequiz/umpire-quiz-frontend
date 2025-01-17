import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Quiz} from "../domain/Quiz";
import {EnvironmentService} from "./environment.service";

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

  getQuizQuestions(): Observable<Quiz> {
    return this.httpClient.get<Quiz>(this.baseUrl)
  }

  clearExistingQuiz() {
    if (this.quizInProgress()) {
      sessionStorage.removeItem('activeQuiz');
    }
  }

  quizInProgress(): boolean {
    const storedQuiz = sessionStorage.getItem('activeQuiz');
    return storedQuiz !== null;
  }

  getQuizResults(): Quiz {
    return JSON.parse(sessionStorage.getItem('lastResult') ?? "");
  }

  postQuizResults(quiz: Quiz) {
    this.httpClient.post<Quiz>(this.baseUrl, quiz).subscribe(data => sessionStorage.setItem('lastResult', JSON.stringify(data)))
  }
  checkQuestionsAnswered(quiz: Quiz): number {
    let count: number = 0;
    for (let question of quiz.questions) {
      if (question.selectedAnswer !== undefined) {
        count++;
      }
    }
    return count;
  }

  allAnswered(quiz: Quiz) {
    return (this.checkQuestionsAnswered(quiz) == quiz.questions.length)
  }
}
