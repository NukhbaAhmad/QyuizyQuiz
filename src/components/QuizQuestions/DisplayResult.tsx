import { useState, useEffect } from "react";

// ? Components
import ReviewQuiz from "./ReviewQuiz";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiResponseQuestionsT } from "../../types";
import { resetData, useAppDispatch } from "../../store/reduxUtils";

const DisplayResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  // Helper Variables
  const resultDetails = location.state?.resultDetails;
  const [showReview, setShowReview] = useState<boolean>(false);

  // Empty out Store
  useEffect(() => {
    dispatch(resetData());
  }, [dispatch]);

  // If no Result Details: Error Page
  useEffect(() => {
    if (!resultDetails) {
      navigate("/404-error");
    }
  }, [navigate, resultDetails]);

  // Handling undefined resultDetails gracefully
  if (!resultDetails) {
    return null;
  }

  const { answersList } = resultDetails;
  const storedQuestions: string = localStorage.getItem("Questions") as string;
  const questions: ApiResponseQuestionsT[] = JSON.parse(storedQuestions);

  // Show Quiz Review
  if (showReview) {
    return <ReviewQuiz questions={questions} answers={answersList} />;
  }

  // Obtained Marks
  const calculateScore = (): number => {
    let score = 0;
    answersList?.forEach((answer: string, index: number) => {
      if (answer === questions[index].correct_answer) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="flex flex-col items-center pt-16">
        <div>
          <h1 className="text-4xl font-bold text-blue-600">Score Earned</h1>
        </div>

        <div className="w-[80%] md:w-[50%] mt-14  border-2 border-black rounded">
          <div className="flex items-center justify-center flex-col ">
            <div className="text-6xl font-bold p-12">
              <p>
                {calculateScore()}/{questions.length}
              </p>
            </div>
          </div>
        </div>

        <div>
          <span>
            Total Time Taken: {localStorage.getItem("totalTimeTaken")}
          </span>
        </div>
        <div className="mt-12">
          <button
            type="button"
            onClick={() => setShowReview(true)}
            className="text-center text-md font-bold p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-800 w-full"
          >
            Review Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayResult;
