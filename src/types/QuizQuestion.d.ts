export interface ApiResponseQuestionsT {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionStoreT {
  data: ApiResponseQuestionsT[];
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}
