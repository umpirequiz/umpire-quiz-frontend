import {emptyQuestion, Question} from "./Question";
import {Difficulty, u1} from "./Difficulty";


export interface Quiz {
  difficulties: Difficulty[]
  questions: Question[]
  quizSize: number
}


export function emptyQuiz(): Quiz {
  return {
    difficulties: [u1] as Difficulty[],
    questions: [emptyQuestion()],
    quizSize: 1
  }
}

export interface QuizProgress {
  currentQuestionIndex: number,
  quiz: Quiz
}
