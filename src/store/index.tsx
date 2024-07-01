import { configureStore } from "@reduxjs/toolkit";
import GetQuestionsSlice from "./slices/GetQuestions";

export const Store = configureStore({
  reducer: {
    QuestionsList: GetQuestionsSlice,
  },
});
