import {Component, OnInit} from '@angular/core';
import {GameState, Question} from '../../../domain/Question'
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {QuizService} from "../../../services/quiz.service";
import {Quiz} from "../../../domain/Quiz";
import {SelectedAnswers} from "../../../domain/SelectedAnswers";
import {GameStateComponent} from "../game-state/game-state.component";
import {QuestionComponent} from "../question/question.component";
import {AnswersComponent} from "../answers/answers.component";

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgForOf,
    NgIf,
    NgClass,
    GameStateComponent,
    QuestionComponent,
    AnswersComponent
  ],
  templateUrl: './play-quiz.component.html',
  styleUrl: './play-quiz.component.scss'
})
export class PlayQuizComponent implements OnInit {
  questionsAnswered: number = 0;
  currentQuestionIndex: number = 0;
  quiz!: Quiz;

  ngOnInit(): void {
    if (this.quizService.quizInProgress()) {
      this.quiz = JSON.parse(sessionStorage.getItem('activeQuiz') ?? "").quiz;
      this.currentQuestionIndex = JSON.parse(sessionStorage.getItem('activeQuiz') ?? "").currentQuestionIndex;
      this.questionsAnswered = this.checkQuestionsAnswered();
    } else {
      this.quizService.getQuizQuestions().subscribe((data) => this.quiz = data)
    }
  }

  constructor(private quizService: QuizService) {
  }

  checkQuestionsAnswered(): number {
    let count: number = 0;
    for (let question of this.quiz.questions) {
      if (question.selectedAnswer !== undefined) {
        count++;
      }
    }
    return count;
  }

  submitAnswers() {
    this.quizService.postQuizResults(this.quiz)
    let selectedAnswers: SelectedAnswers[] = []
    for (let question of this.quiz.questions) {
      selectedAnswers.push({questionId: question.id, answerId: question.selectedAnswer})
    }
    sessionStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers))
    this.quizService.clearExistingQuiz();
  }

  selectAnswer(answer: number): void {
    if (this.currentQuestion.selectedAnswer === answer
    ) {
      this.currentQuestion.selectedAnswer = undefined;
    } else {
      this.currentQuestion.selectedAnswer = answer;
    }
    this.saveQuizProgress();
  }

  saveQuizProgress(): void {
    const quizProgress: {currentQuestionIndex: number, quiz: Quiz} = {
      currentQuestionIndex: this.currentQuestionIndex,
      quiz: this.quiz
    };
    sessionStorage.setItem('activeQuiz', JSON.stringify(quizProgress));
    this.questionsAnswered = this.checkQuestionsAnswered()
  }

  get currentQuestion(): Question {
    if (this.quiz == null) {
      return {
        answers: [],
        gameState: {
          balls: 0,
          outs: 0,
          strikes: 0,
          runnerBase1: false,
          runnerBase2: false,
          runnerBase3: false,
          batterRunner: false
        },
        id: 0,
        i18nValue: {NL_NL: "", EN_US: ""}
      }
    } else {
      return this.quiz.questions[this.currentQuestionIndex];
    }
  }

  isAnswered(index: number): boolean {
    return this.quiz.questions[index].selectedAnswer != undefined;
  }

  prevQuestion(): void {
    if (this.currentQuestionIndex > 0
    ) {
      this.currentQuestionIndex--;
      this.saveQuizProgress();
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.quiz.questions.length
    ) {
      this.currentQuestionIndex++;
      this.saveQuizProgress();
    }
  }

  goToQuestion(index: number): void {
    this.currentQuestionIndex = index;
    this.saveQuizProgress();
  }

  get currentGameState(): GameState {
    return this.currentQuestion.gameState;
  }
}
