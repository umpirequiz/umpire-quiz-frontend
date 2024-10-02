import {Injectable} from '@angular/core';
import {Question} from "../domain/Question";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {EnvironmentService} from "./environment.service";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private host
  private resourcePath = '/questions';
  private questions;

  private _questionsUpdated$ = new Subject<Question[]>()

  constructor(private httpClient: HttpClient, private environmentService: EnvironmentService) {
    this.host = this.environmentService.env.questionServiceUrl
    this.questions = this.host + this.resourcePath
  }

  findAll(active = false): void {
    this.httpClient.get<Question[]>(`${this.questions}?a=${active}`).subscribe((r) => this._questionsUpdated$.next(r));
  }

  find(id: number): Observable<Question> {
    return this.httpClient.get<Question>(`${this.questions}/${id}`);
  }

  add(q: Question) {
    this.httpClient.post<Question>(this.questions, q, {observe: 'response'} /* = to receive the full httpresponse including the token as http header, instead of only the body */)
      .subscribe(() => this.findAll());
  }

  remove(id: number) {
    this.httpClient.delete<Question>(`${this.questions}/${id}`)
      .subscribe(() => this.findAll());
  }

  update(q: Question) {
    this.httpClient.put<Question>(`${this.questions}/${q.id}`, q, {observe: 'response'})
      .subscribe(() => this.findAll());
  }

  search(term: string): void {
    this.httpClient.get<Question[]>(`${this.questions}?q=${term}`).subscribe(
      (result) => this._questionsUpdated$.next(result)
    )
  }

  get questionsUpdated$(): Subject<Question[]> {
    return this._questionsUpdated$;
  }
}
