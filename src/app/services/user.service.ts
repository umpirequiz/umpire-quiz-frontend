import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Router} from "@angular/router";
import {User} from "../domain/User";
import {EnvironmentService} from "./environment.service";
import {MessageService} from "./message.service";

@Injectable({providedIn: 'root'}) // ApplicationScoped
export class UserService {

  public static readonly emptyUser = {} as User;
  public message$ = new Subject<string>();
  public isLoggedIn$ = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient,
              private router: Router,
              private environmentService: EnvironmentService,
              private messageService: MessageService) {
  }

  login(u: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.baseUrl}/login`, u, {observe: 'response'} /* = to receive the full httpresponse instead of only the body */);
  }

  isLoggedIn() {
    return localStorage.getItem('loggedInUser') !== null;
  }

  loggedInUser(): User | null {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('loggedInUser')) as User;
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.messageService.success('Logged out');
    this.isLoggedIn$.next(false);
    this.router.navigate(['/']);
  }

  register(u: User): void {
    this.http.post<User>(`${this.baseUrl}`, u, {observe: 'response'})
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

  loggedIn(loggedInUser: User) {
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    this.isLoggedIn$.next(true);
  }

  private get baseUrl(): string {
    return this.environmentService.env.userServiceUrl + '/users'
  }
}

