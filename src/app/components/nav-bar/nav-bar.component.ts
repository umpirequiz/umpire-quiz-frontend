import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import {AppComponent} from "../../app.component";


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  protected readonly AppComponent = AppComponent;


}
