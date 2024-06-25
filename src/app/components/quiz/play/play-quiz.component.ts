import {Component, OnInit} from '@angular/core';
import {Question} from '../../../domain/Question'
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './play-quiz.component.html',
  styleUrl: './play-quiz.component.scss'
})
export class PlayQuizComponent implements OnInit {
  questions: Question[] = [
    {
      id: 1,
      question:
        {
          NL_NL: "Peter heeft 4 knikkers, hij geeft en 2 aan klaas, hoeveel knikkers heeft jantje",
          EN_US: ""
        },
      answers:
        [
          {
            id: 1,
            answer: {
              NL_NL: "1 knikker",
              EN_US: "blabla"
            }
          },
          {
            id: 2,
            answer: {
              NL_NL: "jantje had al 10 knikkers",
              EN_US: ""
            }
          },
          {
            id: 3,
            answer: {
              NL_NL: "jantje heeft niks met dit verhaal te maken",
              EN_US: ""
            }
          },
          {
            id: 4,
            answer: {
              NL_NL: "schoenen",
              EN_US: ""
            }
          }
        ],
      ruling: {
        NL_NL: "Jantje heeft schoenen aan.",
        EN_US: ""
      }
    },
    {
      id: 2,
      question:
        {
          NL_NL: "Karel heeft 3 meloenen, hoeveel kaas heeft peter",
          EN_US: ""
        },
      answers:
        [
          {
            id: 5,
            answer: {
              NL_NL: "1 knikker",
              EN_US: "blabla"
            }
          },
          {
            id: 6,
            answer: {
              NL_NL: "peter 2kg kaas",
              EN_US: ""
            }
          },
          {
            id: 7,
            answer: {
              NL_NL: "peter lust geen kaas",
              EN_US: ""
            }
          },
          {
            id: 8,
            answer: {
              NL_NL: "schoenen",
              EN_US: ""
            }
          }
        ],
      ruling: {
        NL_NL: "Jantje heeft schoenen aan.",
        EN_US: ""
      }
    },
    {
      id: 3,
      question:
        {
          NL_NL: "Houdt Bram van honkbal?",
          EN_US: ""
        },
      answers:
        [
          {
            id: 9,
            answer: {
              NL_NL: "Ja",
              EN_US: "blabla"
            }
          },
          {
            id: 10,
            answer: {
              NL_NL: "Nee",
              EN_US: ""
            }
          },
          {
            id: 11,
            answer: {
              NL_NL: "Misschien",
              EN_US: ""
            }
          },
          {
            id: 12,
            answer: {
              NL_NL: "schoenen",
              EN_US: ""
            }
          }
        ],
      ruling: {
        NL_NL: "Bram heeft schoenen aan.",
        EN_US: ""
      },
    },
    {
      id: 4,
      question:
        {
          NL_NL: "Thomas speelt minecraft",
          EN_US: ""
        },
      answers:
        [
          {
            id: 13,
            answer: {
              NL_NL: "Ja",
              EN_US: "blabla"
            }
          },
          {
            id: 14,
            answer: {
              NL_NL: "Nee",
              EN_US: ""
            }
          }
        ],
      ruling: {
        NL_NL: "Jantje heeft schoenen aan.",
        EN_US: ""
      }
    },
    {
      id: 6,
      question:
        {
          NL_NL: "Tel tot 6",
          EN_US: ""
        },
      answers:
        [
          {
            id: 15,
            answer: {
              NL_NL: "1",
              EN_US: "blabla"
            }
          },
          {
            id: 16,
            answer: {
              NL_NL: "2",
              EN_US: ""
            }
          },
          {
            id: 17,
            answer: {
              NL_NL: "3",
              EN_US: ""
            }
          },
          {
            id: 18,
            answer: {
              NL_NL: "4",
              EN_US: ""
            }
          },
          {
            id: 19,
            answer: {
              NL_NL: "5",
              EN_US: ""
            }
          },
          {
            id: 20,
            answer: {
              NL_NL: "schoenen",
              EN_US: ""
            }
          }
        ],
      ruling: {
        NL_NL: "Jantje heeft schoenen aan.",
        EN_US: ""
      }
    },
    {
      id: 7,
      question:
        {
          NL_NL: "Madonna brak door met met de volgende hit",
          EN_US: ""
        },
      answers:
        [
          {
            id: 21,
            answer: {
              NL_NL: "Like a prayer",
              EN_US: ""
            }
          },
          {
            id: 22,
            answer: {
              NL_NL: "Like a virgin",
              EN_US: ""
            }
          },
          {
            id: 23,
            answer: {
              NL_NL: "Like Bert van de Ven",
              EN_US: ""
            }
          },
          {
            id: 24,
            answer: {
              NL_NL: "Oma mijn lieve oma",
              EN_US: ""
            }
          }
        ],
      ruling: {
        NL_NL: "Bram heeft schoenen aan.",
        EN_US: ""
      },
    }
  ];
  questionsAnswered: number = 0;
  currentQuestionIndex: number = 0;


  ngOnInit(): void {
    if (this.quizService.quizInProgress()) {
      // @ts-ignore
      this.questions = JSON.parse(sessionStorage.getItem('activeQuiz')).questions;
      // @ts-ignore
      this.currentQuestionIndex = JSON.parse(sessionStorage.getItem('activeQuiz')).currentQuestionIndex;
      this.questionsAnswered = this.checkQuestionsAnswered();
    } else {
      // TODO get quiz from back-end (generated)

    }
  }

  constructor(private quizService: QuizService) {
  }

  checkQuestionsAnswered(): number {
    let count: number = 0;
    for (let question of this.questions) {
      if (question.selectedAnswer !== undefined) {
        count++;
      }
    }
    return count;
  }

  submitAnswers() {
    // TODO: send to back-end and handle response
    const quizProgress = sessionStorage.getItem('activeQuiz');
    if (quizProgress) {
      const parsedQuizQuestions = JSON.parse(quizProgress).questions;
      // TODO send to back-end here
      console.log('Submitting answers:', parsedQuizQuestions);
    }

    this.quizService.clearExistingQuiz();

    // TODO: Go to results with the response
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
    const quizProgress = {
      currentQuestionIndex: this.currentQuestionIndex,
      questions: this.questions
    };
    sessionStorage.setItem('activeQuiz', JSON.stringify(quizProgress));
    this.questionsAnswered = this.checkQuestionsAnswered()
  }

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  isSelected(id: number): boolean {
    return this.currentQuestion.selectedAnswer == id;
  }

  isAnswered(index: number): boolean {
    return this.questions[index].selectedAnswer != undefined;
  }

  prevQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.saveQuizProgress();
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestionIndex++;
      this.saveQuizProgress();
    }
  }

  goToQuestion(index: number): void {
    this.currentQuestionIndex = index;
    this.saveQuizProgress();
  }

}
