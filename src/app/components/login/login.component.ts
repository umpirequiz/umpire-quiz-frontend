import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {User} from "../../domain/User";
import { Observable } from 'rxjs';
import {UserService} from "../../services/user.service";
import { AsyncPipe } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  user = {} as User;
  message$ = this.service.message$;
  isLoggedIn$: Observable<boolean> = new Observable;

  constructor(private service: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.service.loggedIn;
    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/']);
      }
    });
  }

  login(): void {
    console.log(this.user)
    this.service.login(this.user);
    this.user = {} as User;
  }
}
