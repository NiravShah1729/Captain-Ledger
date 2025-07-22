import React, { useState, useEffect } from "react";
import mission1 from "../assets/pictures/ironman.jpeg";
import mission2 from "../assets/pictures/cap.jpeg";
import mission3 from "../assets/pictures/Thor.jpeg";
import mission4 from "../assets/pictures/hulk.jpeg";
import mission5 from "../assets/pictures/widow.jpeg";

const missions = [
  {
    name: "MISSION 1",
    img: mission1,
    alt: "Iron Man flying in a futuristic cityscape with red and gold armor, dynamic action pose, cinematic lighting",
  },
  {
    name: "MISSION 2",
    img: mission2,
    alt: "Captain America standing strong with shield in hand under a cloudy sky, heroic and bold",
  },
  {
    name: "MISSION 3",
    img: mission3,
    alt: "Thor wielding Mjölnir surrounded by lightning on a mountaintop, stormy and powerful",
  },
  {
    name: "MISSION 4",
    img: mission4,
    alt: "Hulk smashing through debris in a city, muscles rippling, green energy all around",
  },
  {
    name: "MISSION 5",
    img: mission5,
    alt: "Black Widow poised with weapons in stealth mode under a red sky, intense and focused",
  },
];

export default function MissionSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % missions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMissionClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="bg-white font-bebas select-none">
      <style jsx="true">{`
        @keyframes growLine {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .grow-line {
          animation: growLine 3s linear forwards;
        }

        .tilted-button {
          background-color: #ed1d24;
          color: white;
          transform: skew(-20deg);
          padding: 12px 28px;
          font-size: 1.2rem;
          text-transform: uppercase;
          font-weight: bold;
          transition: background 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          cursor: pointer;
        }

        .tilted-button:hover {
          background-color: #c41e3a;
        }

        .tilted-text {
          transform: skew(20deg);
        }
      `}</style>

      {/* Image with Buttons on Top */}
      <div className="relative w-full h-[550px] overflow-hidden">
        <img
          key={missions[currentIndex].img}
          src={missions[currentIndex].img}
          alt={missions[currentIndex].alt}
          className="w-full h-[550px] object-cover"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)",
          }}
          draggable={false}
        />

        {/* Buttons on image */}
        <div className="absolute top-1/2 ml-[160px] -translate-y-1/2 flex gap-4">
          {/* JOIN Button */}
          <button
            className="bg-[#ED1D24] text-white text-xl w-[170px] h-[50px] transform skew-x-[-20deg] flex items-center justify-center font-bebas"
            style={{ borderRadius: "0px" }}
          >
            <span className="transform skew-x-[20deg]">JOIN</span>
          </button>

          {/* SEE DETAILS Button */}
          <button
            className="bg-[#ED1D24] text-white text-xl w-[170px] h-[50px] transform skew-x-[-20deg] flex items-center justify-center font-bebas"
            style={{ borderRadius: "0px" }}
          >
            <span className="transform skew-x-[20deg]">SEE DETAILS</span>
          </button>
        </div>
      </div>

      {/* Mission Box with Animated Line */}
      <div className="w-[930px] max-w-full h-[100px] bg-gray-200 mt-[-4rem] ml-[160px] z-10 relative flex justify-between items-center px-6 text-black uppercase font-semibold text-base tracking-wider shadow-lg">
        {missions.map((_, idx) => (
          <div
            key={`line-${idx}`}
            className="absolute top-0 h-[5px]"
            style={{
              left: `${idx * 20}%`,
              width: "20%",
            }}
          >
            {idx === currentIndex && (
              <div className="h-full bg-[#ED1D24] grow-line" />
            )}
          </div>
        ))}

        {missions.map((mission, idx) => (
          <div
            key={idx}
            className="w-1/5 text-center relative cursor-pointer hover:bg-gray-300 transition-colors duration-200 py-2"
            onClick={() => handleMissionClick(idx)}
          >
            <span
              className={idx === currentIndex ? "text-[#ED1D24]" : "text-black"}
            >
              {mission.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
