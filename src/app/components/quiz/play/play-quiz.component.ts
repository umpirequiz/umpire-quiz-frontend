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
import {QuizProgress} from "../../../domain/QuizProgress";


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
    AnswersComponent],
  templateUrl: './play-quiz.component.html',
  styleUrl: './play-quiz.component.scss'
})
export class PlayQuizComponent implements OnInit {
  answeredQuestionsCount: number = 0;
  currentQuestionIndex: number = 0;
  quiz!: Quiz;

  ngOnInit(): void {
    if (this.quizService.quizInProgress()) {
      // this.quiz = QuizService.activeQuiz().quiz;
      // this.currentQuestionIndex = QuizService.activeQuiz().currentQuestionIndex;
      this.quiz = JSON.parse(sessionStorage.getItem('activeQuiz') ?? "{}").quiz;
      this.currentQuestionIndex = JSON.parse(sessionStorage.getItem('activeQuiz') ?? "{}").currentQuestionIndex;
      this.answeredQuestionsCount = this.quizService.countAnsweredQuestions();
    } else {
      this.quizService.getQuiz().subscribe((data) =>
        this.quiz = data
      )
    }
  }

  constructor(private quizService: QuizService) {
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
    if (this.currentQuestion.selectedAnswer === answer) {
      this.currentQuestion.selectedAnswer = undefined;
    } else {
      this.currentQuestion.selectedAnswer = answer;
    }
    this.saveQuizProgress();
  }

  saveQuizProgress(): void {
    const quizProgress: QuizProgress = {
      currentQuestionIndex: this.currentQuestionIndex,
      quiz: this.quiz
    };
    sessionStorage.setItem('activeQuiz', JSON.stringify(quizProgress));
    this.answeredQuestionsCount = this.quizService.countAnsweredQuestions();
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
        enabled: true,
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
    this.scrollToTop()
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.quiz.questions.length
    ) {
      this.currentQuestionIndex++;
      this.saveQuizProgress();
    }
    this.scrollToTop()
  }

  goToQuestion(index: number): void {
    this.currentQuestionIndex = index;
    this.saveQuizProgress();
  }

  get currentGameState(): GameState {
    return this.currentQuestion.gameState;
  }

  allAnswered() {
    if (!this.quiz) return false
    return (this.answeredQuestionsCount == this.quiz.questions.length)
  }

  lastQuestion() {
    if (!this.quiz) return false
    return this.currentQuestionIndex === (this.quiz.questions.length) - 1
  }

  quizLength(): number {
    if (!this.quiz) return 0
    return this.quiz.questions.length;
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
