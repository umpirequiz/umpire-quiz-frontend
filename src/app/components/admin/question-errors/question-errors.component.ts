import {Component, Input} from '@angular/core';
import {emptyQuestion} from "../../../domain/Question";
import {QuestionService} from "../../../services/question.service";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-question-errors',
  standalone: true,
  imports: [
    MatTooltip
  ],
  templateUrl: './question-errors.component.html',
  styleUrl: './question-errors.component.scss'
})
export class QuestionErrorsComponent {
  @Input() question = emptyQuestion();


  constructor(private questionService: QuestionService) {
  }

  remove(id?: number) {
    if (id) {
      this.questionService.removeError(this.question.id, id).subscribe(() =>
        this.questionService.find(this.question.id).subscribe(result => this.question = result)
      );
    }
  }
}
