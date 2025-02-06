import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Quiz} from "../domain/Quiz";
import {EnvironmentService} from "./environment.service";
import {Levels, toCode} from "../components/quiz/home/quiz-home.component";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl!: string

  constructor(private httpClient: HttpClient,
              private environmentService: EnvironmentService,
              private cookieService: CookieService) {
    this.environmentService.env.subscribe(e =>
      this.baseUrl = e.questionServiceUrl + '/quizzes'
    )
  }

  getQuizQuestions(levels?: Levels): Observable<Quiz> {
    let levelsToCode = levels ? toCode(levels) : ''
    return this.httpClient.get<Quiz>(`this.baseUrl/${this.baseUrl}?levels=${levelsToCode}`)
  }

  startNewQuiz(levels: Levels) {
    if (this.quizInProgress()) {
      sessionStorage.removeItem('activeQuiz');
    }
    let oneHundredYears = 36500;
    this.cookieService.set("levels", JSON.stringify(levels), {expires: oneHundredYears, path: '/'});
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
}
