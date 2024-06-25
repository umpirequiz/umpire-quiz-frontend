import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {User} from "../../domain/User";
import {UserService} from "../../services/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user = {} as User;
  message$ = this.service.message$;

  constructor(private service: UserService, private router: Router) {
  }

  register(): void {
    console.log(this.user)
    this.service.register(this.user);
    this.user = {} as User;
  }
}
