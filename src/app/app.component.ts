import {Component, OnInit} from '@angular/core';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {Router, RouterOutlet} from '@angular/router';
import {MessageComponent} from "./components/message/message.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigate(['home'])
  }
}
