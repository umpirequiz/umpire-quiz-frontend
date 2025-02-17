import {Question} from "./Question";
import {Difficulty} from "./Difficulty";


export interface Quiz {
  difficulties: Difficulty[]
  questions: Question[]
  quizSize: number
}
