import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex-row items-center justify-center min-h-screen flex bg-gray-100 ">
      <h1 className="text-6xl font-bold text-blue-500">404</h1>
      <span className="text-5xl p-3 text-gray-400"> | </span>
      <p className="text-md mt-4  text-black">This page could not be found.</p>
    </div>
  );
};
export default NotFound;
