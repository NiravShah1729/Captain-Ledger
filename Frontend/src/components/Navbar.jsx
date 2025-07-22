import React from "react";
import { User, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({
  currentUserName,
  showNavbar,
  isLoggedIn,
  isAdmin,
  onNavAttempt,
}) => {
  const location = useLocation();

  const pathToTab = {
    "/posts": "POSTS",
    "/missions": "MISSIONS",
    "/heroes": "HEROES",
    "/attendence": "ATTENDENCE",
    "/transactions": "TRANSACTIONS",
    "/feedback": "FEEDBACK",
  };
  const activeTab = pathToTab[location.pathname] || "";

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

          .font-smoothing-auto {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }

          @keyframes tubelight-on {
            0% { width: 0%; opacity: 0; }
            100% { width: 100%; opacity: 1; }
          }

          .tubelight-active {
            position: relative;
            overflow: hidden;
          }

          .tubelight-active::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: white;
            box-shadow: 0 5px 10px 2px rgba(255, 255, 255, 0.5);
            animation: tubelight-on 0.5s ease-out forwards;
            opacity: 0;
            z-index: 1;
          }
        `}
      </style>

      <header
        className={`w-full font-['Bebas_Neue'] text-white font-smoothing-auto fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Top Bar */}
        <div
          className="bg-[#202020] px-4 md:px-8 flex items-center justify-between border-b border-gray-700"
          style={{ height: "51px" }}
        >
          {/* Left Section: User or Login */}
          <div className="flex items-center justify-center space-x-2 bg-[#2E2E2E] px-4 border-r border-white h-full">
            <User size={20} className="text-gray-400" />
            {isLoggedIn ? (
              <span className="text-sm md:text-base text-gray-300 tracking-wider">
                {currentUserName}
              </span>
            ) : (
              <button
                onClick={() => onNavAttempt && onNavAttempt("LOGIN")}
                className="text-sm md:text-base text-white hover:text-white tracking-wider"
              >
                LOG IN | SIGN UP
              </button>
            )}
          </div>

          {/* Center Section: Marvel Studios Logo */}
          <div className="flex-grow flex justify-center items-center h-full">
            <img
              src="https://placehold.co/150x40/2E2E2E/FFFFFF?text=MARVEL+STUDIOS"
              alt="Marvel Studios Logo"
              className="h-8 md:h-10 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/150x40/2E2E2E/FFFFFF?text=MARVEL+STUDIOS";
              }}
            />
          </div>

          {/* Right Section: Search */}
          <div className="flex items-center justify-center space-x-2 bg-[#2E2E2E] px-4 border-l border-white h-full">
            <span className="text-sm md:text-base text-gray-300 hidden sm:block tracking-wider">
              SEARCH
            </span>
            <Search size={20} className="text-gray-400" />
          </div>
        </div>

        {/* Navigation Bar */}
        <nav
          className="bg-[#202020] px-4 md:px-8 flex items-center justify-center"
          style={{ height: "41px" }}
        >
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-2xl">
            {[
              "POSTS",
              "MISSIONS",
              "HEROES",
              "ATTENDENCE",
              "TRANSACTIONS",
              "FEEDBACK",
            ].map((link, index) => (
              <li key={index}>
                {isLoggedIn ? (
                  <Link
                    to={`/${link.toLowerCase()}`}
                    className={`relative text-gray-300 hover:text-white transition-colors duration-200 rounded-md py-1 px-2 tracking-wider ${
                      link === activeTab ? "text-white tubelight-active" : ""
                    }`}
                  >
                    {link}
                  </Link>
                ) : (
                  <button
                    className={`relative text-gray-300 hover:text-white transition-colors duration-200 rounded-md py-1 px-2 tracking-wider bg-transparent border-none outline-none cursor-pointer ${
                      link === activeTab ? "text-white tubelight-active" : ""
                    }`}
                    onClick={() => onNavAttempt && onNavAttempt(link)}
                  >
                    {link}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Justice Quote */}
        <div
          className="px-4 md:px-8 text-center text-xl text-[#ED1D24] uppercase flex items-center justify-center tracking-wider"
          style={{
            height: "41px",
            backgroundColor: "#151515",
            borderTop: "none",
          }}
        >
          JUSTICE HAS A NEW NAME – CAPTAIN LEDGER
        </div>
      </header>
    </>
  );
};

export default Navbar;
