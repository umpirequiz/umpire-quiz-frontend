import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
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
export class RegisterComponent implements OnInit {
  user = {} as User;
  confirmPassword: string = '';
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

  register(): void {
    if (this.user.password === this.confirmPassword) {
      console.log(this.user)
      this.service.register(this.user);
      this.user = {} as User;
    }
    
  }
}
