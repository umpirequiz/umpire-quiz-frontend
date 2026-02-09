import {Injectable} from '@angular/core';
import {Question} from "../domain/Question";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {EnvironmentService} from "./environment.service";
import {MessageService} from "./message.service";
import {QuestionError} from "../domain/QuestionError";
import {QuestionCount} from "../domain/QuestionCount";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly baseUrl: string;

  private _questionsUpdated$ = new Subject<Question[]>()
  private _questionCount$ = new Subject<QuestionCount[]>()

  constructor(private httpClient: HttpClient, private environmentService: EnvironmentService, private messageService: MessageService) {
    this.baseUrl = this.environmentService.env.questionServiceUrl + '/questions'
  }

  findAll(): void {
    this.search('');
  }

  find(id: number): Observable<Question> {
    return this.httpClient.get<Question>(`${this.baseUrl}/${id}`);
  }

  add(q: Question) {
    this.httpClient.post<Question>(this.baseUrl, q, {observe: 'response'} /* = to receive the full httpresponse including the token as http header, instead of only the body */)
      .subscribe(() => this.findAll());
  }

  remove(id: number) {
    this.httpClient.delete<Question>(`${this.baseUrl}/${id}`)
      .subscribe(() => this.findAll());
  }

  update(q: Question) {
    this.httpClient.put<Question>(`${this.baseUrl}/${q.id}`, q, {observe: 'response'})
      .subscribe(() => this.findAll());
  }

  search(term = '', includeAll = false, includeBugs = false): void {
    this.httpClient.get<Question[]>(`${this.baseUrl}?q=${term}&all=${includeAll}&bugs=${includeBugs}`).subscribe(
      (result) => this._questionsUpdated$.next(result)
    )
  }

  get questionsUpdated$(): Subject<Question[]> {
    return this._questionsUpdated$;
  }


  reportError(questionId: number, e: QuestionError) {
    this.httpClient.post<QuestionError>(`${this.baseUrl}/${questionId}/errors`, e, {observe: 'response'})
      .subscribe(
        () => this.messageService.success("Thank you for improving this app!")
      );
  }

  removeError(questionId: number, questionErrorId: number) {
    return this.httpClient.delete<QuestionError>(`${this.baseUrl}/${questionId}/errors/${questionErrorId}`);
  }

  count() {
    this.httpClient.get<QuestionCount[]>(`${this.baseUrl}/count`).subscribe((c) => {
      this._questionCount$.next(c);
    })
  }

  get questionCount$(): Subject<QuestionCount[]> {
    return this._questionCount$;
  }
}
