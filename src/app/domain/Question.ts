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

interface InternationalizedString {
  NL_NL: string;
  EN_US: string;
}

interface GameState {
  balls: number
  outs: number
  strikes: number
  runnerBase1: boolean
  runnerBase2: boolean
  runnerBase3: boolean
  batterRunner: boolean
}
