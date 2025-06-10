import {QuestionError} from "./QuestionError";
import {Difficulty, u1} from "./Difficulty";

export interface InternationalizedValued {
  i18nValue: InternationalizedString
}

export interface Question extends InternationalizedValued {
  id: number;
  difficulty: Difficulty;
  gameState: GameState;
  enabled: boolean;
  link: string;
  answers: Answer[];
  errors?: QuestionError[];
  selectedAnswer?: number;
  questionIndex?: number;
  i18nRuling?: InternationalizedString;
}

export interface Answer extends InternationalizedValued {
  id: number;
  correct?: boolean;
}

export interface TranslatedAnswer {
  id: number;
  value: string;
  correct?: boolean;
}

export interface InternationalizedString {
  NL_NL: string;
  EN_US: string;
}

export interface GameState {
  balls: number
  outs: number
  strikes: number
  runnerBase1: boolean
  runnerBase2: boolean
  runnerBase3: boolean
  batterRunner: boolean
}

export function emptyQuestion(): Question {
  return {
    id: 0,
    difficulty: u1,
    i18nValue: emptyI18dString(),
    gameState: emptyGameState(),
    enabled: true,
    link: '',
    answers: [emptyAnswer()] as Answer[],
    selectedAnswer: 0,
    questionIndex: 0,
    i18nRuling: emptyI18dString()
  }
}

export function emptyAnswer(): Answer {
  return {
    id: 0,
    i18nValue: emptyI18dString(),
    correct: false
  }
}

function emptyGameState(): GameState {
  return {
    balls: 0,
    outs: 0,
    strikes: 0,
    runnerBase1: false,
    runnerBase2: false,
    runnerBase3: false,
    batterRunner: false
  }
}

export function emptyI18dString(): InternationalizedString {
  return {
    NL_NL: "",
    EN_US: ""
  }
}
