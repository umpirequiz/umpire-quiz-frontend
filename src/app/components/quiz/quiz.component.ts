import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {PlayQuizComponent} from "./play/play-quiz.component";

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    PlayQuizComponent
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {

}
