import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable, of} from "rxjs";
import {take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private _env$ = new BehaviorSubject<Environment>({
    userServiceUrl: "Not available...",
    questionServiceUrl: "Not available...",
    importerServiceUrl: "Not available...",
    health: ""
  });

  constructor(private httpClient: HttpClient) {
  }

  public load(): Observable<any> {
    const sessionEnv = sessionStorage.getItem('env');
    const source$ = sessionEnv
      ? of(JSON.parse(sessionEnv))
      : this.httpClient.get<Environment>(`${window.location.origin}/${environment.env_file}`);

    return source$.pipe(
      tap(env => {
        this._env$.next(env);
        sessionStorage.setItem('env', JSON.stringify(env));
      }),
      take(1)
    );
  }

  public get env(): Environment {
    return this._env$.value;
  }

}

interface Environment {
  userServiceUrl: string
  questionServiceUrl: string
  importerServiceUrl: string
  health: "" | "READY"
}
