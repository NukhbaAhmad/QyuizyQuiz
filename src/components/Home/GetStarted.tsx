import React from "react";
import { Link } from "react-router-dom";

const GetStarted: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 md:gap-2 grid-cols-1 mt-24 ">
      <div className="flex flex-col items-center">
        <div className="pl-24">
          <h1 className="text-2xl font-bold ">Explore Your Knowledge</h1>
          <p className="w-[80%] pt-4">
            Test your knowledge across various topics and discover new facts.
            Ready to embark on a journey of learning and fun?
          </p>
          <Link to="/customize-quiz">
            <button className="text-blue-500 bg-gray-200 p-4 rounded font-bold mt-8 flex items-center hover:bg-gray-300">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <div className="md:block hidden">
        <img src="GetStarted-Home-person.png" alt="GetStarted Person" />
      </div>
    </div>
  );
};
export default GetStarted;
