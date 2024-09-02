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

export let emptyQuestion = {
  id: 0,
  i18nValue: {} as InternationalizedString,
  gameState: {} as GameState,
  answers: [] as Answer[],
  selectedAnswer: 0,
  questionIndex: 0,
  i18nRuling:  {} as InternationalizedString
}
