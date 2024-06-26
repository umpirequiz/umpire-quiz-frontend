import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

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
  }

  getEnv() {
    this.httpClient.get<Environment>(window.location.origin + '/' + environment.env_file).subscribe(data => {
      this._env = data
      sessionStorage.setItem('env', JSON.stringify(data))
    })
  }

  get env(): Environment {
    if (this._env.health == "") {
      const env: Environment = JSON.parse(sessionStorage.getItem('env') ?? "")
      this.env = env
      return env
    } else {
      return this._env
    }
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
