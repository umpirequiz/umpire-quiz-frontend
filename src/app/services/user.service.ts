import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {userService} from '../../environments/environment';
import {Router} from "@angular/router";
import {User} from "../domain/User";
import {EnvironmentService} from "./environment.service";

@Injectable({providedIn: 'root'}) // ApplicationScoped
export class UserService {
  private readonly baseUrl: string

  public static readonly emptyUser = {} as User;

  public loggedInMessage$ = new Subject<string>();
  public message$ = new Subject<string>();


  constructor(private http: HttpClient, private router: Router, private environmentService: EnvironmentService) {
    this.baseUrl = this.environmentService.env.userServiceUrl
  }

  login(u: User): void {
    this.http.post<User>(`${this.baseUrl}/auth-api/auth/login`, u, {observe: 'response'} /* = to receive the full httpresponse instead of only the body */)
      .subscribe({
        next: (response) => {
          // get the body from the response:
          const loggedInUser = response.body ?? UserService.emptyUser;

          this.loggedInMessage$.next(`Logged in as ${loggedInUser.username}`);
          this.message$.next(`User ${loggedInUser.username} is logged in.`);
          localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

          // ... or get the Authorization header from the response:
          // const token = response.headers.get('Authorization')?.substr(7);
          // localStorage.setItem('token', JSON.stringify(token));
        },
        error: (errorResponse) => {
          this.message$.next(`Login failed.  Reason: ${errorResponse.statusText}.`);
        }
      });
  }

  isLoggedIn() {
    return localStorage.getItem('loggedInUser') !== null;
  }

  loggedInUser(): User | null {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('loggedInUser')) as User;
  }

  logout(): void {
    localStorage.removeItem('loggedInUser')
    this.loggedInMessage$.next('Not logged in')
    this.router.navigate(['/login']);
  }


  register(u: User): void {
    this.http.post<User>(`${userService}`, u, { observe: 'response' })
      .subscribe({
        next: (response) => {
          const registeredUser = response.body ?? UserService.emptyUser;
          
          this.message$.next(`Registration successful for user ${registeredUser.username}.`);
          this.router.navigate(['/login']);
        },
        error: (errorResponse) => {
          this.message$.next(`Registration failed. Reason: ${errorResponse.statusText}.`);
        }
      });
  }
}

