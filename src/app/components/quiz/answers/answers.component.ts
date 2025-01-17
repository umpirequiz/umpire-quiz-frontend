import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer, emptyAnswer, Question} from "../../../domain/Question";
import {NgClass} from "@angular/common";
import {SelectedAnswers} from "../../../domain/SelectedAnswers";
import {FormsModule} from "@angular/forms";
import {QuizService} from "../../../services/quiz.service";
import {Quiz} from "../../../domain/Quiz";

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
export class AnswersComponent implements OnInit {
  @Input() quiz?: Quiz;
  @Input() question!: Question;
  @Input() resultsScreen = false
  @Input() edit = false
  @Input() answers = [] as Answer[]
  @Output() next: EventEmitter<void> = new EventEmitter<void>()
  @Output() select: EventEmitter<number> = new EventEmitter<number>()

  selectedAnswer?: number
  questionId: number = 0

  constructor(private quizService: QuizService) {
  }

  ngOnInit(): void {
    console.log("ngOnInit " + JSON.stringify(this.question))
    // this.answers = this.question.answers
    this.selectedAnswer = this.question.selectedAnswer
    this.questionId = this.question.id
  }

  onSelect(id: number): void {
    this.select.emit(id);
  }

  isSelected(id: number): boolean {
    return this.selectedAnswer == id;
  }

  selectAnswerKeyboardWrapper(answer: number, e: KeyboardEvent) {
    if (e.key == " " ||
      e.code == "Space") {
      this.onSelect(answer)
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
    if (this.quiz)
      return this.quizService.allAnswered(this.quiz);
    else
      return false
  }
}
