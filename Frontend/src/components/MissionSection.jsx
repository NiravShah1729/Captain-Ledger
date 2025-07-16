import React from "react";
import ironManImage from "../assets/pictures/ironman.jpeg";
import "../assets/fonts/font.css"; // Make sure this imports Bebas Neue properly

const missions = [
  "MISSION 1",
  "MISSION 2",
  "MISSION 3",
  "MISSION 4",
  "MISSION 5",
];

const MissionSection = () => {
  return (
    <section className="bg-white font-bebas">
      {/* Slanted Image with Reduced Height */}
      <div className="relative w-full h-[550px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${ironManImage})`,
            clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)",
          }}
        />
      </div>

      {/* Mission Box - 160px from the left */}
      <div className="w-[930px] h-[100px] bg-gray-200 mt-[-4rem] ml-[160px] z-10 relative flex justify-between items-center px-6 text-black uppercase font-semibold text-sm tracking-wider shadow-lg rounded-t-md">
        {missions.map((mission, idx) => (
          <div key={idx} className="w-1/5 text-center">
            {mission}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MissionSection;
