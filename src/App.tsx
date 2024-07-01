import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CustomizeQuiz from "./pages/CustomizeQuiz";
import NotFound from "./pages/404Page/404Page";
import QuizQuestions from "./pages/QuizQuestions/QuizQuestions";

import React from "react";
import { DisplayResult, QuestionDislay } from "./components/QuizQuestions";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customize-quiz" element={<CustomizeQuiz />} />
        <Route path="/quiz-questions" element={<QuizQuestions />} />
        <Route
          path="/quiz-questions/:questionNumber"
          element={<QuestionDislay />}
        />
        <Route path="/display-result" element={<DisplayResult />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
