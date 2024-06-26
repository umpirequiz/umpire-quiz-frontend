import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Quiz} from "../domain/Quiz";
import {EnvironmentService} from "./environment.service";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly baseUrl: string

  constructor(private httpClient: HttpClient, private environmentService: EnvironmentService) {
    this.baseUrl = this.environmentService.env.questionServiceUrl
  }

  getQuizQuestions(): Observable<Quiz> {
    return this.httpClient.get<Quiz>(this.baseUrl + "/quizzes")
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
    this.httpClient.post<Quiz>(this.baseUrl + "/quizzes", quiz).subscribe(data => sessionStorage.setItem('lastResult', JSON.stringify(data)))
  }
}
