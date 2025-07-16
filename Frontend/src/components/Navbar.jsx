// App.js
import React from "react";
import { User, Search } from "lucide-react";

function App() {
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
        `}
      </style>

      <div className="w-full bg-transparent font-['Bebas_Neue'] text-white font-smoothing-auto">
        {/* Header Section */}
        <header className="w-full">
          {/* Top Bar */}
          <div
            className="bg-[#202020] px-4 md:px-8 flex items-center justify-between border-b border-gray-700"
            style={{ height: "51px" }}
          >
            {/* Left Section: User Profile */}
            <div className="flex items-center justify-center space-x-2 bg-[#000000] px-4 border-r border-white h-full">
              <User size={20} className="text-gray-400" />
              <span className="text-sm md:text-base text-gray-300">NIRAV</span>
            </div>

            {/* Center Section: Marvel Studios Logo */}
            <div className="flex-grow flex justify-center items-center h-full">
              <img
                src="image_0aa198.png"
                alt="Marvel Studios Logo"
                className="h-8 md:h-10 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/150x40/000000/FFFFFF?text=MARVEL+STUDIOS";
                }}
              />
            </div>

            {/* Right Section: Search */}
            <div className="flex items-center justify-center space-x-2 bg-[#000000] px-4 border-l border-white h-full">
              <span className="text-sm md:text-base text-gray-300 hidden sm:block">
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
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-200 rounded-md py-1 px-2"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Justice Quote */}
          <div
            className="px-4 md:px-8 text-center text-xl text-red-500 uppercase flex items-center justify-center"
            style={{
              height: "41px",
              backgroundColor: "#151515",
              borderTop: "none",
            }}
          >
            JUSTICE HAS A NEW NAME – CAPTAIN LEDGER
          </div>
        </header>
      </div>
    </>
  );
}

export default App;
