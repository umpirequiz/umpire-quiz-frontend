import { Component } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import {MessageComponent} from "./components/message/message.component";
import {EnvironmentService} from "./services/environment.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private environmentService: EnvironmentService) {
    console.log("this.environmentService.getEnv()")
    this.environmentService.getEnv()
  }
}
