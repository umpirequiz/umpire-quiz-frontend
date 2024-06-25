import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {Answer, Question} from "../../../domain/Question";
import {QuizService} from "../../../services/quiz.service";
import {SelectedAnswers} from "../../../domain/SelectedAnswers";

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
    this.getSelected();
  }

  getSelected() {
    for (let question of this.results) {
      if (question.selectedAnswer !== undefined) {
        this.selected.push(question.selectedAnswer)
      }
    }
  }

  getQuestions(): Question[] {
    return this.quizService.getQuizResults().questions
  }

  wasAnsweredCorrectly(questionId: number, answerId: number): 'bg-success' | 'bg-danger' | '' {
    const givenAnswers: SelectedAnswers[] = JSON.parse(sessionStorage.getItem('selectedAnswers') ?? "")
    const givenAnswer: SelectedAnswers | undefined = givenAnswers.find(a => a.questionId == questionId)
    const questions: Question[] = JSON.parse(sessionStorage.getItem('lastResult') ?? "").questions
    const correctAnswer: Answer | undefined = questions.find(q => q.id == questionId)?.answers.find(a => a.correct)

    if ( answerId == correctAnswer?.id ) { return 'bg-success' }
    else if ( answerId == givenAnswer?.answerId ) { return 'bg-danger' }
    else { return '' }
  }

  getQuestionsCorrect(): number {
    return this.getQuestionsThatAre("Correct")
  }

  getQuestionsThatAre(state: "Correct" | "Incorrect"): number {
    const allGivenAnswers: SelectedAnswers[] = JSON.parse(sessionStorage.getItem('selectedAnswers') ?? "")
    const actualGivenAnswers: SelectedAnswers[] = allGivenAnswers.filter(a => a.answerId != undefined)
    const questions: Question[] = JSON.parse(sessionStorage.getItem('lastResult') ?? "").questions
    let counter: number = 0

    for (let answer of actualGivenAnswers) {
      const question: Question | undefined = questions.find(q => q.id == answer.questionId)
      const correctAnswer: Answer | undefined = question?.answers.find(a => a.correct)

      switch(state) {
        case "Correct":
          if (correctAnswer?.id == answer.answerId) { counter += 1 }
          break
        case "Incorrect":
          if (correctAnswer?.id != answer.answerId) { counter += 1 }
          break
      }
    }

    return counter
  }

  getPercentage(counter: number) {
    const questions: Question[] = JSON.parse(sessionStorage.getItem('lastResult') ?? "").questions
    return (counter / questions.length) * 100
  }
  getQuestionsIncorrect(): number {
    return this.getQuestionsThatAre("Incorrect")
  }

}
