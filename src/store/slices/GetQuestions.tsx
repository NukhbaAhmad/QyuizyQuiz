import { createAsyncThunk, createSlice, AsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { ApiResponseQuestionsT, CustomizeQuizStateT } from "../../types/";

// Fteching Questions from API
export const GetQuestions: AsyncThunk<
  ApiResponseQuestionsT[],
  CustomizeQuizStateT,
  object
> = createAsyncThunk<ApiResponseQuestionsT[], CustomizeQuizStateT>(
  "GetQuestions/ApiCall",
  async (customizeQuizState) => {
    const { numberOfQuestions, category, difficulty, type } =
      customizeQuizState;
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_FETCH_QUESTIONS_BASE_API_URL
        }amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`
      );
      return data.results as ApiResponseQuestionsT[];
    } catch (error) {
      console.log("Oops There seems to be an error:", error);
      throw error;
    }
  }
);

const initialState = {
  data: [] as ApiResponseQuestionsT[],
  isSuccess: false,
  isLoading: false,
  isError: false,
};

const GetQuestionsSlice = createSlice({
  name: "Api",
  initialState,
  reducers: {
    resetData: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetQuestions.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(GetQuestions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.data = action.payload;
    });

    builder.addCase(GetQuestions.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    });
  },
});
// ActionCreatorWithoutPayload<"Api/resetData">
// eslint-disable-next-line react-refresh/only-export-components
export const { resetData } = GetQuestionsSlice.actions;
export default GetQuestionsSlice.reducer;
