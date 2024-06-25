import {Injectable} from '@angular/core';
import {Question} from "../domain/Question";

@Injectable({
  providedIn: 'root'
})
export class QuizService {


  constructor() {
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

  getQuizResults() {
    let index: number = 0;
    let lastResult = sessionStorage.getItem('lastResult');
    const results: Question[] = JSON.parse(lastResult !== null ? lastResult : "[]");
    for (let question of results) {
      question.questionIndex = index++;
    }
    return results;
  }
}
