import { Link } from "react-router-dom";

import { QuizErrorDisplayCompoPropsT } from "../../types";

const QuizErrorDisplay: React.FC<QuizErrorDisplayCompoPropsT> = ({
  message,
}) => {
  return (
    <div className=" min-h-screen w-full bg-gray-100 flex items-center ">
      <div className=" md:w-[80%] w-[80%] mx-auto flex-col items-center  justify-center flex text-center">
        <p className="text-md mt-4  text-black">{message}</p>
        <Link to="/customize-quiz">
          <button
            type="submit"
            className="mt-4 text-center text-md font-bold p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-800"
          >
            Try Again
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuizErrorDisplay;
