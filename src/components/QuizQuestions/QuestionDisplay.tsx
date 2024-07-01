import _ from "lodash";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FormEvent, useMemo, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ? Types
import {
  ApiResponseQuestionsT,
  SelectedAnswerT,
  PrevQuestionRecordT,
} from "../../types";

// ? Components
import Toast from "../ToastMessage/Toast";
import Timer from "./Timer";

const QuestionDislay: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedQuestions = localStorage.getItem("Questions");
    if (storedQuestions) {
      navigate("/customize-quiz");
    }
  }, [navigate]);

  // ? STATE MANAGEMENT
  //User Selected Options
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswerT>({
    choice: "",
    isCorrect: false,
  });

  // Manage Prev Q: For disbale Purpose
  const [prevQuestionRecord, setPrevQuestionRecord] =
    useState<PrevQuestionRecordT>({
      answeredQuesList: [],
      selectedChoicesList: [],
    });

  // Track if quiz is complete
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);

  // Fetch Question Number from URL
  const { questionNumber } = useParams<{ questionNumber: string }>();

  // ? HELPER VARIABLES
  // Access Question passed as state when navigating
  const { questions } = location.state;

  // Zero-based index for accessing the current question from the array
  const questionIndex: number = questionNumber
    ? parseInt(questionNumber) - 1
    : 0;

  // Accessing the question from array
  const currentQuestion: ApiResponseQuestionsT = questions[questionIndex];

  //? FUNCTIONS

  // NEXT QUESTION
  const handleNextQuestion = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Must Select an option to continue
    if (
      selectedAnswer.choice === "" &&
      !prevQuestionRecord.selectedChoicesList.includes(selectedAnswer.choice)
    ) {
      if (prevQuestionRecord.answeredQuesList.includes(questionIndex)) {
        console.log("Next Allowed");
      } else {
        Toast({ message: "You must select an option to continue" });
        return;
      }
    }
    updatePreviousQuestionRecord();

    // Navigate if next Q exists else show result
    if (questionIndex + 1 < questions.length) {
      resetAnswerState();
      navigateToNextQuestion();
    } else {
      setIsQuizComplete(true);
    }
  };

  // Options Randomize
  const QuestionChoices = useMemo(() => {
    const choices = currentQuestion.incorrect_answers.concat(
      currentQuestion.correct_answer
    );
    const randomizeChoices = _.shuffle(choices);
    return randomizeChoices;
  }, [currentQuestion]);

  // ANSWER SELECTED
  const onAnswerSelection = (answer: string) => {
    if (answer === currentQuestion.correct_answer) {
      setSelectedAnswer((prev) => ({
        ...prev,
        choice: answer,
        isCorrect: true,
      }));
    } else {
      setSelectedAnswer((prev) => ({
        ...prev,
        choice: answer,
        isCorrect: false,
      }));
    }
  };

  // Hanlde disbaled Questions: On Next Click
  const updatePreviousQuestionRecord = () => {
    setPrevQuestionRecord((prev) => ({
      ...prev,
      answeredQuesList: prev.answeredQuesList.includes(questionIndex)
        ? prev.answeredQuesList
        : [...prev.answeredQuesList, questionIndex],
      selectedChoicesList:
        selectedAnswer.choice !== ""
          ? [...prev.selectedChoicesList, selectedAnswer.choice]
          : prev.selectedChoicesList,
    }));
  };

  // Update Answer to def: For Next Q
  const resetAnswerState = () => {
    setSelectedAnswer({
      choice: "",
      isCorrect: false,
    });
  };

  const navigateToNextQuestion = () => {
    navigate(`/quiz-questions/${questionIndex + 2}`, { state: { questions } });
  };

  useEffect(() => {
    if (isQuizComplete) {
      
      localStorage.setItem("Questions", JSON.stringify(questions));
     
      navigate("/display-result", {
        state: {
          resultDetails: {
            answersList: prevQuestionRecord.selectedChoicesList,
          },
        },
      });
    }
  }, [
    isQuizComplete,
    navigate,
    questions,
    prevQuestionRecord.selectedChoicesList,
  ]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4 ">
      <Timer
        totalQuestions={questions.length}
        answersList={prevQuestionRecord.selectedChoicesList}
        questions={questions}
      />
      <form
        className="bg-gray-100 p-6 rounded-lg shadow-md  md:w-[70%] w-[90%]"
        onSubmit={handleNextQuestion}
      >
        <div className="md:w-[80%] sm:w-[90%] w-full mx-auto flex items-center flex-col">
          <h2 className="select-none p-4 text-lg font-semibold mb-4 text-center w-full mx-auto border-2 border-gray-500 rounded">
            {questionIndex + 1}: {currentQuestion.question}
          </h2>
          <div className="select-none grid md:grid-cols-2 grid-cols-1 gap-4 mb-4 w-full mt-12">
            {QuestionChoices.map((choice, index) => {
              return (
                <label
                  key={index}
                  onClick={() => {
                    if (
                      !prevQuestionRecord.answeredQuesList?.includes(
                        questionIndex
                      )
                    ) {
                      onAnswerSelection(choice);
                    } else {
                      Toast({ message: "Option Already Selected." });
                    }
                  }}
                  className={`p-4 flex items-center justify-center rounded-lg cursor-pointer hover:bg-green-300 ${
                    selectedAnswer.choice === choice ||
                    prevQuestionRecord.selectedChoicesList?.includes(choice)
                      ? "bg-green-700 text-white hover:bg-green-800"
                      : "text-black bg-gray-300"
                  } 
                  ${
                    prevQuestionRecord.answeredQuesList?.includes(questionIndex)
                      ? "bg-gray-300 cursor-not-allowed"
                      : ""
                  }  
                 `}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={choice}
                    disabled={prevQuestionRecord.answeredQuesList?.includes(
                      questionIndex
                    )}
                    className="hidden"
                  />
                  {choice}
                </label>
              );
            })}
          </div>
          <button
            type="submit"
            className="mt-4 text-center text-md font-bold p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-800 w-[50%]"
          >
            {questionIndex + 2 <= questions.length ? "Next" : "Submit"}
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default QuestionDislay;
