import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private _env: Environment = {
    userServiceUrl: "",
    questionServiceUrl: "",
    importerServiceUrl: "",
    health: ""
  }

  constructor(private httpClient: HttpClient) {
    this.init()
  }

  private init() {
    this.env.subscribe(data => {
      this._env = data
      sessionStorage.setItem('env', JSON.stringify(data))
    })
  }

  get env(): Observable<Environment> {
    return this.httpClient.get<Environment>(window.location.origin + '/' + environment.env_file);
  }

  set env(env: Environment) {
    this._env = env
  }
}

interface Environment {
  userServiceUrl: string
  questionServiceUrl: string
  importerServiceUrl: string
  health: "" | "READY"
}
