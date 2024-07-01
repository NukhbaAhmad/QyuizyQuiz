import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TimerCompPropsT } from "../../types";

const Timer: React.FC<TimerCompPropsT> = ({
  totalQuestions,
  answersList,
  questions,
}) => {
  const navigate = useNavigate();

  const quizDuration = 10; // Quiz Time
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);

  // Start the timer on component mount or page refresh
  useEffect(() => {
    const startTimeString = localStorage.getItem("quizStartTime");
    const startTime = startTimeString
      ? parseInt(startTimeString, 10)
      : Date.now();

    // Calculate elapsed time if quiz already started
    const currentTime = Date.now();
    const elapsedTimeFromStart = Math.floor((currentTime - startTime) / 1000);

    // Check if elapsed time exceeds quiz duration
    if (elapsedTimeFromStart >= quizDuration) {
      setIsQuizComplete(true);
    } else {
      setElapsedTime(elapsedTimeFromStart);
    }

    // Update after each 1s
    const timerInterval = setInterval(() => {
      const currentTime = Date.now();
      const timeElapsed = Math.floor((currentTime - startTime) / 1000);

      // Time Passed >=Quiz time: End Quiz
      if (timeElapsed >= quizDuration) {
        setIsQuizComplete(true);
        clearInterval(timerInterval);
      } else {
        setElapsedTime(timeElapsed);
      }
    }, 1000);

    // Save time in case refreshed Page
    localStorage.setItem("quizStartTime", startTime.toString());

    // Clean up
    return () => clearInterval(timerInterval);
  }, [quizDuration]);

  // Format Time
  const formatElapsedTime = (time: number) => {
    // Remaining seconds
    const totalSeconds = quizDuration - time;

    // Total minutes
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Time Complete: End Quiz
  useEffect(() => {
    if (isQuizComplete) {
      localStorage.setItem("Questions", JSON.stringify(questions));
      navigate("/display-result", {
        state: {
          resultDetails: {
            totalQuestions,
            answersList,
            questions,
          },
        },
      });
    }
  }, [
    isQuizComplete,
    navigate,
    elapsedTime,
    totalQuestions,
    answersList,
    questions,
  ]);

  return (
    <div className="text-center p-5 text-2xl w-[50%] md:w-[30%] text-white font-bold mb-4 border-2 rounded border-blue-500 hover:border-blue-600 bg-blue-500 hover:bg-blue-600">
      {formatElapsedTime(elapsedTime)}
    </div>
  );
};

export default Timer;
