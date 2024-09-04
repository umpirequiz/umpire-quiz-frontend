export interface Question {
  id: number;
  i18nValue: InternationalizedString;
  gameState: GameState;
  answers: Answer[];
  selectedAnswer?: number;
  questionIndex?: number;
  i18nRuling?: InternationalizedString;
}

export interface Answer {
  id: number;
  i18nValue: InternationalizedString;
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

let emptyI18dString = {
  NL_NL: "", EN_US: ""
}

let emptyGameState = {
  balls: 0,
  outs: 0,
  strikes: 0,
  runnerBase1: false,
  runnerBase2: false,
  runnerBase3: false,
  batterRunner: false
}

let emptyAnswer = {
  id: 0,
  i18nValue: emptyI18dString,
  correct: false
}

export let emptyQuestion: Question = {
  id: 0,
  i18nValue: emptyI18dString,
  gameState: emptyGameState,
  answers: [emptyAnswer] as Answer[],
  selectedAnswer: 0,
  questionIndex: 0,
  i18nRuling:  emptyI18dString
}
