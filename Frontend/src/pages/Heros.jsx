"use client";

import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// Sample Marvel heroes data
const currentUser = {
  _id: "1",
  name: "Tony Stark",
  avatar: "/placeholder.svg?height=40&width=40",
};
const heroesData = [
  {
    id: 1,
    name: "Iron Man",
    realName: "Tony Stark",
    image: "/placeholder.svg?height=300&width=224",
  },
  {
    id: 2,
    name: "Captain America",
    realName: "Steve Rogers",
    image: "/placeholder.svg?height=300&width=224",
  },
  {
    id: 3,
    name: "Thor",
    realName: "Thor Odinson",
    image: "/placeholder.svg?height=300&width=224",
  },
  {
    id: 4,
    name: "Black Widow",
    realName: "Natasha Romanoff",
    image: "/placeholder.svg?height=300&width=224",
  },
  {
    id: 5,
    name: "Hulk",
    realName: "Bruce Banner",
    image: "/placeholder.svg?height=300&width=224",
  },
  {
    id: 6,
    name: "Hawkeye",
    realName: "Clint Barton",
    image: "/placeholder.svg?height=300&width=224",
  },
  {
    id: 7,
    name: "Spider-Man",
    realName: "Peter Parker",
    image: "/placeholder.svg?height=300&width=224",
  },
  {
    id: 8,
    name: "Doctor Strange",
    realName: "Stephen Strange",
    image: "/placeholder.svg?height=300&width=224",
  },
  {
    id: 9,
    name: "Black Panther",
    realName: "T'Challa",
    image: "/placeholder.svg?height=300&width=224",
  },
  {
    id: 10,
    name: "Captain Marvel",
    realName: "Carol Danvers",
    image: "/placeholder.svg?height=300&width=224",
  },
  {
    id: 11,
    name: "Ant-Man",
    realName: "Scott Lang",
    image: "/placeholder.svg?height=300&width=224",
  },
  {
    id: 12,
    name: "Scarlet Witch",
    realName: "Wanda Maximoff",
    image: "/placeholder.svg?height=300&width=224",
  },
];

const HeroPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter heroes based on search term using useMemo for performance
  const filteredHeroes = useMemo(() => {
    if (!searchTerm.trim()) {
      return heroesData;
    }

    return heroesData.filter(
      (hero) =>
        hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hero.realName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Navbar
        currentUserName={currentUser?.name || "GUEST"}
        showNavbar={true}
        isLoggedIn={true}
        isAdmin={true}
        onNavAttempt={() => {}}
      />
      <main className="bg-black min-h-screen text-white font-sans pt-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Hero Header with Background */}
          <div className="relative mb-8 overflow-hidden rounded-lg">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/placeholder.svg?height=200&width=1200"
                alt="Marvel Heroes Background"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            </div>

            {/* Header Content */}
            <div className="relative z-10 flex flex-col items-center justify-center p-8 min-h-[200px]">
              {/* Hero Heading - Centered */}
              <div className="text-center">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-2 tracking-wider">
                  MARVEL
                </h1>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#ED1D24] tracking-wide">
                  HEROES DATABASE
                </h2>
                <p className="text-gray-300 text-lg mt-2">
                  Discover the legendary heroes of the Marvel Universe
                </p>
              </div>
            </div>
          </div>

          {/* Navigation and Search Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 bg-gray-900/50 rounded-lg p-4">
            {/* Navigation Tabs - Left Side */}
            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
              <button className="px-4 py-2 bg-[#ED1D24] text-white rounded-md font-semibold">
                ALL
              </button>
              <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md font-semibold hover:bg-gray-600 transition-colors">
                FAVORITES
              </button>
              <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md font-semibold hover:bg-gray-600 transition-colors">
                AVENGERS
              </button>
              <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md font-semibold hover:bg-gray-600 transition-colors">
                X-MEN
              </button>
            </div>

            {/* Search Bar - Right Side */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search heroes..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-64 lg:w-80 p-3 pl-10 rounded-md text-white bg-gray-800 border border-gray-600 focus:outline-none focus:border-[#ED1D24] focus:ring-1 focus:ring-[#ED1D24] transition-all duration-300 placeholder-gray-400"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="text-gray-400 text-sm">
                {filteredHeroes.length} found
              </div>
            </div>
          </div>

          {/* Filtered Hero Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 justify-items-center">
            {filteredHeroes.length > 0 ? (
              filteredHeroes.map((hero, idx) => (
                <div
                  key={hero.id}
                  className="group w-[224px] h-[430px] flex flex-col items-center justify-start overflow-hidden cursor-pointer relative"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
                  }}
                >
                  <div className="w-full h-[55%] overflow-hidden relative">
                    <img
                      src={hero.image || "/placeholder.svg"}
                      alt={hero.name}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#ED1D24] z-10"></div>
                  </div>
                  <div className="relative w-full flex-1 bg-[#202020] px-4 py-3 flex flex-col overflow-hidden transition-colors duration-500 ease-in-out group-hover:bg-[#ED1D24]">
                    <div className="absolute top-0 left-0 right-0 h-0 bg-[#ED1D24] z-0 transition-all duration-500 ease-in-out group-hover:h-full"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <h3 className="text-2xl leading-tight text-white group-hover:text-white transition-colors duration-500 font-bold">
                        {hero.name}
                      </h3>
                      <p className="text-base text-white group-hover:text-white mt-auto transition-colors duration-500 tracking-wide">
                        {hero.realName}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🦸‍♂️</div>
                <h3 className="text-2xl text-gray-400 mb-2">No heroes found</h3>
                <p className="text-gray-500">
                  Try searching for a different hero name or real name
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              Marvel Heroes Database • {heroesData.length} Total Heroes
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HeroPage;
