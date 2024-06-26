import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {Answer, Question} from "../../../domain/Question";
import {QuizService} from "../../../services/quiz.service";
import {SelectedAnswers} from "../../../domain/SelectedAnswers";
import {QuestionComponent} from "../question/question.component";
import {GameStateComponent} from "../game-state/game-state.component";
import {AnswersComponent} from "../answers/answers.component";
import {RulingComponent} from "../ruling/ruling.component";

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    QuestionComponent,
    GameStateComponent,
    AnswersComponent,
    RulingComponent
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
