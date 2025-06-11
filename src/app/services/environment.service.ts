import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";

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
    const sessionEnv = sessionStorage.getItem('env');

    if (sessionEnv) {
      this._env$.next(JSON.parse(sessionEnv));
    } else {
      this.httpClient.get<Environment>(window.location.origin + '/' + environment.env_file)
        .subscribe(data => {
          this._env$.next(data);
          sessionStorage.setItem('env', JSON.stringify(data));
        });
    }
  }

  public get env(): Environment {
    return this._env$.value;
  }

  noop() {
  }
}

interface Environment {
  userServiceUrl: string
  questionServiceUrl: string
  importerServiceUrl: string
  health: "" | "READY"
}
