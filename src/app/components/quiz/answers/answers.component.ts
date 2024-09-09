import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Answer, Question} from "../../../domain/Question";
import {NgClass} from "@angular/common";
import {SelectedAnswers} from "../../../domain/SelectedAnswers";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [
    NgClass,
    FormsModule
  ],
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.scss'
})
export class AnswersComponent {
  @Input() answers = [] as Answer[]
  @Input() resultsScreen?: boolean
  @Input() selectedAnswer?: number
  @Input() questionId: number = 0
  @Input() edit?: boolean
  @Output() selectedAnswerEvent: EventEmitter<number> = new EventEmitter<number>()

  selectAnswer(id: number): void {
    this.selectedAnswerEvent.emit(id);
  }

  isSelected(id: number): boolean {
    return this.selectedAnswer == id;
  }

  selectAnswerKeyboardWrapper(answer: number, e: KeyboardEvent) {
    if (e.key == " " ||
      e.code == "Space") {
      this.selectAnswer(answer)
    }
  }

  wasAnsweredCorrectly(questionId: number, answerId: number): 'bg-success' | 'bg-danger' | '' {
    const givenAnswers: SelectedAnswers[] = JSON.parse(sessionStorage.getItem('selectedAnswers') ?? "")
    const givenAnswer: SelectedAnswers | undefined = givenAnswers.find(a => a.questionId == questionId)
    const questions: Question[] = JSON.parse(sessionStorage.getItem('lastResult') ?? "").questions
    const correctAnswer: Answer | undefined = questions.find(q => q.id == questionId)?.answers.find(a => a.correct)

    if (answerId == correctAnswer?.id) {
      return 'bg-success'
    } else if (answerId == givenAnswer?.answerId) {
      return 'bg-danger'
    } else {
      return ''
    }
  }

  setCorrectAnswer(index: number) {
    this.answers.forEach((answer: Answer) => {
      answer.correct = false
    })
    this.answers[index].correct = true
  }

  isCorrectAnswer(index: number): boolean {
    return this.answers[index]?.correct ?? false
  }
}
