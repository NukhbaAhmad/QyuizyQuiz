import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ? Types
import { CustomizeQuizStateT, randomizeQuizInputT } from "../../types";

// ? Components
import Label from "../../components/CustomizeQuiz/Label";
import SelectOptions from "../../components/CustomizeQuiz/SelectOptions";
import {
  McqTypeOptions,
  DifficultyOptions,
  CategoriesOptions,
} from "../../constants/quizSelectOptions";
import { GetQuestions } from "../../store/slices/GetQuestions";
import { useAppDispatch } from "../../store/reduxUtils";

const CustomizeQuiz: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // States
  const [CustomizeQuiz, setCustomizeQuiz] = useState<CustomizeQuizStateT>({
    numberOfQuestions: 10,
    category: "any",
    difficulty: "any",
    type: "any",
  });

  // Conditions
  ["Questions", "quizStartTime", "totalTimeTaken"].forEach((key) => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  });

  //Functions
  const handleOptionsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCustomizeQuiz((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const randomizeQuiz = (optionsList: randomizeQuizInputT[]): string => {
    const randomIndex = Math.floor(Math.random() * optionsList.length);
    return optionsList[randomIndex].type;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Select Random Options if "any"
    setCustomizeQuiz((prev) => {
      const updatedQuiz = {
        ...prev,
        category:
          CustomizeQuiz.category === "any"
            ? randomizeQuiz(CategoriesOptions)
            : CustomizeQuiz.category,
        difficulty:
          CustomizeQuiz.difficulty === "any"
            ? randomizeQuiz(DifficultyOptions)
            : CustomizeQuiz.difficulty,
        type:
          CustomizeQuiz.type === "any"
            ? randomizeQuiz(McqTypeOptions)
            : CustomizeQuiz.type,
      };

      dispatch(GetQuestions(updatedQuiz))
        .unwrap()
        .then(() => {
          navigate("/quiz-questions");
        });
      return updatedQuiz;
    });
  };

  return (
    <div className="w-full">
      <form className="w-[70%] mt-8 mx-auto" onSubmit={handleSubmit}>
        <fieldset className="ps-5 border-4 border-blue-500 rounded-lg">
          <legend className="p-3 font-bold text-lg">
            Personalize Your Quiz
          </legend>

          {/* Form Fields */}
          <div className="mt-8 w-[90%] mx-auto">
            <Label title="Number of Questions" />
            <input
              type="number"
              id="no_of_questions"
              name="numberOfQuestions"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2 "
              placeholder="Enter a multiple of 10, between 10 and 50"
              onChange={handleOptionsChange}
              required
              max={50}
              step={10}
              min={10}
            />

            {/* Cargories */}
            <Label title="Select Category" />
            <SelectOptions
              name="category"
              options={CategoriesOptions}
              optionLabel="Any Category"
              value={CustomizeQuiz.category}
              onChange={handleOptionsChange}
            />

            {/* Difficulty */}
            <Label title="Select Difficulty" />
            <SelectOptions
              name="difficulty"
              options={DifficultyOptions}
              optionLabel="Any Difficulty"
              value={CustomizeQuiz.difficulty}
              onChange={handleOptionsChange}
            />

            {/* Type */}
            <Label title="Select Type" />
            <SelectOptions
              name="type"
              options={McqTypeOptions}
              optionLabel="Any Type"
              value={CustomizeQuiz.type}
              onChange={handleOptionsChange}
            />

            <div className="flex items-center justify-center mt-8 mb-4">
              <button className="ps-4 pe-4 py-2 bg-blue-500 text-white font-semibold text-lg rounded">
                Start Quiz
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
export default CustomizeQuiz;
