import { RiQuestionAnswerLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

import { useState } from "react";

const Navbar: React.FC = () => {
  const [hamMenu, setHamMenu] = useState<boolean>(false);

  // ENV
  const githubUrl: string = import.meta.env.VITE_GITHUB_PROFILE_LINK || "";
  const linkedinUrl: string = import.meta.env.VITE_LINKEDLN_PROFILE_LINK || "";

  return (
    <div>
      <header className="sticky top-0 bg-gray-100 shadow-md flex items-center justify-between px-12 py-02">
        <div className="flex items-center justify-between">
          <RiQuestionAnswerLine className="h-8 w-8" />
          <span className="font-bold text-lg px-2 text-blue-500">
            QuizyQuiz
          </span>
        </div>

        <div>
          {/* Hamburger*/}
          <div className="md:hidden block py-4">
            <button onClick={() => setHamMenu(!hamMenu)} className="">
              {hamMenu ? (
                <MdClose className="h-8 w-8 " />
              ) : (
                <GiHamburgerMenu className="h-8 w-8" />
              )}
            </button>
          </div>

          {/* Nav List */}
          <nav
            className={`nav font-semibold text-lg ${
              hamMenu ? "block" : "hidden"
            } md:block`}
          >
            <ul
              className={`flex items-center ${
                hamMenu
                  ? "flex-col absolute left-0 top-[100%] w-full shadow-md pb-6 pt-6 bg-gray-200"
                  : "flex-row"
              }`}
            >
              <li className="p-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  Github
                </a>
              </li>
              <li className="p-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                  Linkdln
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
