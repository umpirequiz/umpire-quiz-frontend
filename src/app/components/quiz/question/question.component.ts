import {Component, Input} from '@angular/core';
import {Question} from "../../../domain/Question";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  @Input() question!: Question
  @Input() edit!: boolean;
}
