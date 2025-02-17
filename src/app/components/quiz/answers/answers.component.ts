import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Answer, emptyAnswer, Question} from "../../../domain/Question";
import {NgClass, NgIf} from "@angular/common";
import {SelectedAnswers} from "../../../domain/SelectedAnswers";
import {FormsModule} from "@angular/forms";
import {Quiz} from "../../../domain/Quiz";
import {MatTooltip} from "@angular/material/tooltip";
import {QuestionService} from "../../../services/question.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    MatTooltip,
    RouterLink,
    NgIf
  ],
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.scss'
})
export class AnswersComponent {
  @Input() questionId = 0
  @Input() answers = [] as Answer[]
  @Input() selectedAnswer?: number
  @Input() results = false
  @Input() edit = false
  @Input() isLastQuestion = false;
  @Output() select: EventEmitter<number> = new EventEmitter<number>()
  @Output() next: EventEmitter<void> = new EventEmitter<void>()
  @Output() finish: EventEmitter<void> = new EventEmitter<void>()
  message = '';

  constructor(private questionService: QuestionService) {
  }

  selectAnswer(id: number): void {
    this.select.emit(id);
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

  newAnswer() {
    this.answers.push(emptyAnswer())
  }

  onNext() {
    this.next.next();
  }

  allAnswered() {
    const quiz = JSON.parse(sessionStorage.getItem('activeQuiz') ?? "{}").quiz as Quiz;
    if (!quiz) return false;

    let count: number = 0;
    for (let question of quiz.questions) {
      if (question.selectedAnswer !== undefined) {
        count++;
      }
    }

    return (count == quiz.questions.length)
  }

  reportError() {
    this.questionService.reportError(this.questionId, {message: this.message})
  }

  modalId() {
    return `reportErrorModal${this.questionId}`;
  }

  onFinish() {
    this.finish.emit()
  }

}
