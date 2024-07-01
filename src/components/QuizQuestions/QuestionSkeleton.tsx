const QuestionSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4 ">
      <form className="bg-gray-100 p-6 rounded-lg shadow-md  md:w-[70%] w-[90%] animate-pulse">
        <div className="md:w-[80%] sm:w-[90%] w-full mx-auto flex items-center flex-col">
          <h2 className="select-none p-4 text-lg font-semibold mb-4 text-center w-full mx-auto border-2 border-gray-500 rounded">
            Loading...
          </h2>
          <div className="select-none grid md:grid-cols-2 grid-cols-1 gap-4 mb-4 w-full mt-12">
            <label className="p-4 flex items-center justify-center bg-gray-400 rounded-lg cursor-pointer">
              <input
                type="radio"
                name="answer"
                value="Body integrity identity disorder"
                className="hidden"
              />
            </label>
            <label className="p-4 flex items-center justify-center bg-gray-400 rounded-lg cursor-pointer">
              <input
                type="radio"
                name="answer"
                value="Identity crisis"
                className="hidden"
              />
            </label>
            <label className="p-4 flex items-center justify-center bg-gray-400 rounded-lg cursor-pointer">
              <input
                type="radio"
                name="answer"
                value="Dissociative identity disorder"
                className="hidden"
              />
            </label>
            <label className="p-4 flex items-center justify-center bg-gray-400 rounded-lg cursor-pointer">
              <input
                type="radio"
                name="answer"
                value="Schizophrenia"
                className="hidden"
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};
export default QuestionSkeleton;
