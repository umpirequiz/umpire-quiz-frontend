import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Quiz} from "../domain/Quiz";

@Injectable({
  providedIn: 'root'
})
export class QuizService {


  constructor(private httpClient: HttpClient) {
  }

  getQuizQuestions(): Observable<Quiz> {
    return this.httpClient.get<Quiz>("http://localhost:9080/quizzes")
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
    this.httpClient.post<Quiz>("http://localhost:9080/quizzes", quiz).subscribe(data => sessionStorage.setItem('lastResult', JSON.stringify(data)))
  }
}
