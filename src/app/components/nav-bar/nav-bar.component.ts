import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AppComponent} from "../../app.component";
import {UserService} from '../../services/user.service';
import {User} from '../../domain/User';
import {Observable} from 'rxjs';
import {CommonModule} from '@angular/common';
import {LanguageSwitcherComponent} from "../language-switcher/language-switcher.component";


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    LanguageSwitcherComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = new Observable;
  user: string = '';

  protected readonly AppComponent = AppComponent;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.userService.isLoggedIn$;
    this.isLoggedIn$.subscribe(status => {
      if (status) {
        this.user = this.loggedInUser();
      } else {
        this.user = 'null';
      }
    });
  }


  loggedInUser(): string {
    let user: User | null = this.userService.loggedInUser();
    return user !== null ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : 'none';
  }

  logout(): void {
    this.userService.logout();
  }

}
