import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AsyncPipe } from '@angular/common';
import {User} from "../../domain/User";
import {UserService} from "../../services/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user = {} as User;
  confirmPassword: string = '';
  message$ = this.service.message$;

  constructor(private service: UserService, private router: Router) {
  }

  register(): void {
    if (this.user.password === this.confirmPassword) {
      console.log(this.user)
      this.service.register(this.user);
      this.user = {} as User;
    }
    
  }
}
