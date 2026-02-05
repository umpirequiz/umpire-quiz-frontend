import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from "../../domain/User";
import {Subject} from 'rxjs';
import {UserService} from "../../services/user.service";
import {AsyncPipe} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  user = {} as User;
  message$ = this.service.message$;
  isLoggedIn$
  // public loggedInMessage$ = new Subject<string>();


  constructor(private service: UserService, private router: Router, private messageService: MessageService) {
    this.isLoggedIn$ = this.service.isLoggedIn$;
  }

  ngOnInit(): void {
    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/']);
      }
    });
  }

  login(): void {
    this.service.login(this.user)
      .subscribe({
        next: (okResponse) => {
          const loggedInUser = okResponse.body ?? UserService.emptyUser;
          this.service.loggedIn(loggedInUser)
          this.messageService.success(`User ${loggedInUser.username} is logged in.`)
          this.router.navigate(['/']);
        },
        error: (errorResponse) => {
          this.messageService.error(`Login failed.  Reason: ${errorResponse.statusText}.`)
        }
      });
    this.user = {} as User;
  }
}
