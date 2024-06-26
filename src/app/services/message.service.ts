import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private _alert$ = new Subject<AlertMessage>();

  get alert$(): Observable<AlertMessage> {
    return this._alert$.asObservable();
  }

  success(message: string) {
    this._alert$.next({type: 'success', text: message});
  }

  error(message: string) {
    this._alert$.next({type: 'danger', text: message});
  }

  warn(message: string) {
    this._alert$.next({type: 'warning', text: message});
  }
}

export interface AlertMessage {
  type: 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'secondary' | 'light' | 'dark';
  text: string;
}
