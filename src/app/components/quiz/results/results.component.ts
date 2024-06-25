import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {Answer, Question} from "../../../domain/Question";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {
  results: Question[] = [];
  selected: number[] = [];

  constructor(private quizService: QuizService) {
  }

  ngOnInit(): void {
    this.results = this.quizService.getQuizResults();
    this.getSelected();
  }

  getSelected() {
    for(let question of this.results) {
      if (question.selectedAnswer !== undefined){
        this.selected.push(question.selectedAnswer)
      }
    }
  }

  isSelected(id: number) {
    return
  }

  isCorrect(answer: Answer | undefined): boolean {
    return answer !== undefined ? answer.correct == true : false;
  }
}
