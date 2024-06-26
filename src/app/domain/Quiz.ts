import {Question} from "./Question";

export interface Quiz {
  difficulties: "UMPIRE_1" | "UMPIRE_2" | "UMPIRE_3" | "UMPIRE_4"[]
  questions: Question[]
  quizSize: number
}
