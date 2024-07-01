import ApiResponseQuestionsT from "./QuizQuestion";

export interface FormLabelPropsT {
  title: string;
}

interface SelectOptionT {
  val: string;
  type: string | number;
}

export interface SelectOptionsCompPropsT {
  options: SelectOptionT[];
  name: string;
  optionLabel: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface QuizErrorDisplayCompoPropsT {
  message: string;
}

export interface QuestionCompPropsT {
  currentQuestion: ApiResponseQuestionsT;
  nextQuestion: () => void;
}

export interface ToastCompPropT {
  message: string;
}

export interface ResultDetailsT {
  totalQuestions: number;
  answersList: string[];
  questions: ApiResponseQuestionsT[];
}

export interface DisplayResultCompT {
  resultDetails: ResultDetailsT;
}

export interface ReviewQuizCompPropsT {
  questions: ApiResponseQuestionsT[];
  answers: string[];
}

interface TimerCompPropsT {
  totalQuestions: number;
  answersList: string[];
  questions: ApiResponseQuestionsT[];
  
}
