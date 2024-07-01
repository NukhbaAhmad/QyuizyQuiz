import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReviewQuizCompPropsT } from "../../types";

const ReviewQuiz: React.FC<ReviewQuizCompPropsT> = ({ questions, answers }) => {
  const navigate = useNavigate();

  // If Questions not Exist:  404
  useEffect(() => {
    if (
      !questions ||
      questions.length === 0 ||
      !answers ||
      answers.length === 0
    ) {
      navigate("/404-error");
    }
  }, [navigate, answers, questions]);

  // Handle undefined questions/answers
  if (
    !questions ||
    questions.length === 0 ||
    !answers ||
    answers.length === 0
  ) {
    return null;
  }

  return (
    <div className="flex flex-col  min-h-screen  p-4 bg-gray-100 ">
      <div className="md:w-[60%] mt-12 sm:w-[90%] mx-auto w-full   flex-col">
        <h1 className="p-3 pb-4 text-xl font-bold text-center">
          Review Your Quiz
        </h1>
        {questions.map((question, index) => (
          <div key={index} className="w-full mb-8">
            <h2 className="select-none p-2 text-lg font-semibold mb-4 text-center w-full mx-auto border-2 border-gray-500 rounded">
              {index + 1}: {question.question}
            </h2>
            <div className="select-none grid md:grid-cols-2 grid-cols-1 gap-4 mb-4 w-full mt-12">
              {question.incorrect_answers
                .concat(question.correct_answer)
                .map((choice: string, choiceIndex: number) => {
                  return (
                    <label
                      key={choiceIndex}
                      className={`p-4 flex items-center bg-gray-200 justify-center rounded-lg cursor-pointer
                        ${
                          answers[index] === choice
                            ? choice === question.correct_answer
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-red-600 text-white hover:bg-red-700"
                            : choice === question.correct_answer
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-300 text-black"
                        }`}
                    >
                      <input
                        type="radio"
                        name={`answer-${index}`}
                        value={choice}
                        disabled={true}
                        className="hidden"
                      />
                      {choice}
                    </label>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
      <Link to="/customize-quiz" className="w-full flex justify-center">
        <button
          type="button"
          className="mt-4 text-center text-md font-bold p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-800 w-[30%]"
        >
          Play Again
        </button>
      </Link>
    </div>
  );
};

export default ReviewQuiz;
