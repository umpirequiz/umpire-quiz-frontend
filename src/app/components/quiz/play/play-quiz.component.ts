import {Component, OnInit} from '@angular/core';
import {emptyQuestion, GameState, Question} from '../../../domain/Question'
import {Router} from "@angular/router";
import {NgClass, NgForOf} from "@angular/common";
import {QuizService} from "../../../services/quiz.service";
import {emptyQuiz, Quiz, QuizProgress} from "../../../domain/Quiz";
import {SelectedAnswers} from "../../../domain/SelectedAnswers";
import {QuestionComponent} from "../question/question.component";
import {AnswersComponent} from "../answers/answers.component";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    QuestionComponent,
    AnswersComponent
  ],
  templateUrl: './play-quiz.component.html',
  styleUrl: './play-quiz.component.scss'
})
export class PlayQuizComponent implements OnInit {
  answeredQuestionsCount: number = 0;
  currentQuestionIndex: number = 0;
  quiz: Quiz = emptyQuiz();

  constructor(private quizService: QuizService,
              private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.quizService.quizInProgress()) {
      let activeQuiz: QuizProgress = JSON.parse(sessionStorage.getItem('activeQuiz') ?? "{}");
      this.quiz = activeQuiz.quiz;
      this.currentQuestionIndex = activeQuiz.currentQuestionIndex;
      this.answeredQuestionsCount = this.countAnsweredQuestions();
    } else {
      let levels = JSON.parse(this.cookieService.get("levels"));
      this.quizService.getQuizQuestions(levels)
        .subscribe((data) => {
          this.quiz = data
          this.saveQuizProgress();
        })
    }
  }

  countAnsweredQuestions(): number {
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
    this.answeredQuestionsCount = this.countAnsweredQuestions()
  }

  get currentQuestion(): Question {
    if (this.quiz == null) {
      return emptyQuestion()
    } else {
      return this.quiz.questions[this.currentQuestionIndex];
    }
  }

  isAnswered(index: number): boolean {
    return this.quiz.questions[index].selectedAnswer != undefined;
  }

  prevQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.saveQuizProgress();
    }
    this.scrollToTop();
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.getQuizSize() - 1) {
      this.currentQuestionIndex++;
      this.saveQuizProgress();
    }
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  goToQuestion(index: number): void {
    this.currentQuestionIndex = index;
    this.saveQuizProgress();
  }

  get currentGameState(): GameState {
    return this.currentQuestion.gameState;
  }

  allAnswered() {
    return (this.answeredQuestionsCount == this.getQuizSize())
  }

  finish() {
    this.submitAnswers()
    sessionStorage.removeItem('activeQuiz');
    this.router.navigate(['/quiz/results'])
  }

  lastQuestion() {
    return this.currentQuestionIndex == this.getQuizSize() - 1;
  }

  getQuizSize() {
    return this.quiz?.questions.length ?? 0;
  }
}
