export interface CustomizeQuizOptionsT {
  val: string;
  type: string;
}

export interface CustomizeQuizStateT {
  numberOfQuestions: number;
  category: string;
  difficulty: string;
  type: string;
}

export interface randomizeQuizInputT {
  val: string;
  type: string;
}

export interface SelectedAnswerT {
  choice: string;
  isCorrect: boolean;
}

export interface PrevQuestionRecordT {
  answeredQuesList: number[];
  selectedChoicesList: string[];
}
