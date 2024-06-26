import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {User} from "../../domain/User";
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
export class LoginComponent {
  user = {} as User;
  message$ = this.service.message$;

  constructor(private service: UserService, private router: Router) {
  }

  login(): void {
    console.log(this.user)
    this.service.login(this.user);
    this.user = {} as User;
  }
}
