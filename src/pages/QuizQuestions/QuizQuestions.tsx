import { useEffect } from "react";

import { useAppSelector } from "../../store/reduxUtils";

// ? Types
import { QuestionStoreT } from "../../types";

// ? Compoenents
import {
  QuestionSkeleton,
  QuizErrorDisplay,
} from "../../components/QuizQuestions";
import { useNavigate } from "react-router-dom";

const QuizQuestions: React.FC = () => {
  const navigate = useNavigate();

  // Questions Fetched from Store
  const questions: QuestionStoreT = useAppSelector(
    (state) => state.QuestionsList
  );
  const { data, isSuccess, isLoading, isError } = questions;

  // Api Fetch Succesfull: Questions Founded
  useEffect(() => {
    if (isSuccess && data.length > 0) {
      navigate(`/quiz-questions/1`, { state: { questions: data } });
    }
  }, [isSuccess, data, navigate]);

  //  Loading Question: Api Request Pending
  if (isLoading && !isSuccess) {
    return <QuestionSkeleton />;
  }

  //  Error: Api Data Fetching
  if (isError && !isLoading && !isSuccess) {
    return (
      <QuizErrorDisplay message="Oops! Unable to retrieve questions.Try again Later." />
    );
  }

  //   No Question Founded
  if (data.length === 0) {
    return (
      <QuizErrorDisplay
        message="We couldn't find any questions matching your criteria. Please try again
        with different settings."
      />
    );
  }

  return null;
};

export default QuizQuestions;
