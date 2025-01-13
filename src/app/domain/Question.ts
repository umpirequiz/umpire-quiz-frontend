export interface Question {
  id: number;
  i18nValue: InternationalizedString;
  gameState: GameState;
  enabled: boolean;
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

export function emptyQuestion(): Question {
  return {
    id: 0,
    i18nValue: emptyI18dString(),
    gameState: emptyGameState(),
    enabled: true,
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

function emptyI18dString(): InternationalizedString {
  return {
    NL_NL: "",
    EN_US: ""
  }
}
