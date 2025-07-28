import React from "react";
import "../assets/fonts/font.css"; // Bebas Neue font

// Assets
import avengersVideo from "../assets/videos/Title_animation.mp4";
import ironmanImg from "../assets/pictures/ironman.jpeg";
import capImg from "../assets/pictures/cap.jpeg";
import thorImg from "../assets/pictures/Thor.jpeg";
import hulkImg from "../assets/pictures/hulk.jpeg";

const heroes = [
  {
    name: "IRON MAN",
    realName: "TONY STARK",
    image: ironmanImg,
  },
  {
    name: "CAPTAIN AMERICA",
    realName: "STEVE ROGERS",
    image: capImg,
  },
  {
    name: "THOR",
    realName: "ODIN PUTRA",
    image: thorImg,
  },
  {
    name: "HULK",
    realName: "BRUCE BANNER",
    image: hulkImg,
  },
];

const HeroSection = () => {
  return (
    <section className="relative w-full text-white bg-[#FFFFFF] font-bebas">
      {/* Avengers Video */}
      <div className="w-full h-[600px] overflow-hidden">
        <video
          src={avengersVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Card Container */}
      <div className="w-full flex justify-center relative z-10">
        <div className="w-[1117px] h-[530px] bg-[#FFFFFF] -mt-[60px] flex px-[101.5px] gap-[18px] items-center shadow-2xl rounded-md">
          {heroes.map((hero, idx) => (
            <div
              key={idx}
              className="group w-[224px] h-[430px] flex flex-col items-center justify-start overflow-hidden cursor-pointer rounded-md relative"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
              }}
            >
              {/* Top: Image */}
              <div className="w-full h-[55%] overflow-hidden relative">
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                {/* Red line under image */}
                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#ED1D24] z-10"></div>
              </div>

              {/* Bottom: Info Section */}
              <div className="relative w-full flex-1 bg-[#202020] px-4 py-3 flex flex-col overflow-hidden transition-colors duration-500 ease-in-out group-hover:bg-[#ED1D24]">
                {/* Red slide fill */}
                <div className="absolute top-0 left-0 right-0 h-0 bg-[#ED1D24] z-0 transition-all duration-500 ease-in-out group-hover:h-full"></div>

                {/* Text */}
                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="text-2xl leading-tight text-white group-hover:text-white transition-colors duration-500">
                    {hero.name}
                  </h3>
                  <p className="text-base text-white group-hover:text-white mt-auto transition-colors duration-500 tracking-wide">
                    {hero.realName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
