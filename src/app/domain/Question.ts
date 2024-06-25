export interface Question {
  id: number;
  question: InternationalizedString;
  answers: Answer[];
  selectedAnswer?: number;
  questionIndex?: number;
  ruling: InternationalizedString;
}

export interface Answer {
  id: number;
  answer: InternationalizedString;
  correct?: boolean;
}

interface InternationalizedString {
  NL_NL: string;
  EN_US: string;
}
