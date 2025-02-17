import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Quiz} from "../domain/Quiz";
import {EnvironmentService} from "./environment.service";
import {CookieService} from "ngx-cookie-service";
import {Levels, toCode} from "../domain/Levels";

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
    return this.httpClient.get<Quiz>(`${this.baseUrl}?levels=${levelsToCode}`)
  }

  startNewQuiz(levels: Levels) {
    let oneHundredYears = 36500;
    this.cookieService.set("levels", JSON.stringify(levels), {expires: oneHundredYears, path: '/'});
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
}
