import React from "react";
import ironman from "../assets/pictures/ironman.jpeg";
import cap from "../assets/pictures/cap.jpeg";
import Thor from "../assets/pictures/Thor.jpeg";
import hulk from "../assets/pictures/hulk.jpeg";
import marvel from "../assets/pictures/marvel.jpeg";

const HeroCard = ({ heroName, realName, image }) => {
  return (
    <div
      style={{
        width: 224,
        height: 431,
        background: "#202020",
        position: "relative",
      }}
    >
      <img
        style={{ width: 224, height: 215.5, top: 0, position: "absolute" }}
        src={image}
      />
      <div
        style={{
          width: 224,
          height: 6,
          top: 216,
          position: "absolute",
          background: "#ED1D24",
        }}
      />
      <div
        style={{
          left: 17,
          top: 238,
          position: "absolute",
          color: "white",
          fontSize: 32,
          fontFamily: "Bebas Neue",
          fontWeight: "400",
        }}
      >
        {heroName}
      </div>
      <div
        style={{
          left: 17,
          top: 393,
          position: "absolute",
          color: "white",
          fontSize: 20,
          fontFamily: "Bebas Neue",
          fontWeight: "400",
        }}
      >
        {realName}
      </div>
    </div>
  );
};

const Footer = () => {
  const heroes = [
    {
      heroName: "IRON MAN",
      realName: "TONY STARK",
      image: ironman,
    },
    {
      heroName: "Captain America",
      realName: "STEVE ROGERS",
      image: cap,
    },
    {
      heroName: "Thor",
      realName: "ODIN PUTRA",
      image: Thor,
    },
    {
      heroName: "Hulk",
      realName: "BRUCE BANNER",
      image: hulk,
    },
  ];

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {/* Middle Image Section */}
      <img
        style={{ width: "100%", height: 620, position: "relative" }}
        src={marvel}
      />

      {/* Heroes Section */}
      <div
        style={{
          width: "100%",
          height: 530,
          background: "white",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 26,
            left: 235,
            top: 49,
            position: "absolute",
          }}
        >
          {heroes.map((hero, index) => (
            <HeroCard
              key={index}
              heroName={hero.heroName}
              realName={hero.realName}
              image={hero.image}
            />
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div
        style={{
          width: "100%",
          height: 343,
          background: "#202020",
          position: "relative",
        }}
      >
        <img
          style={{
            width: 224,
            height: 201,
            left: 235,
            top: 77,
            position: "absolute",
          }}
          src="https://placehold.co/224x201"
        />

        <div
          style={{
            left: 501,
            top: 143,
            position: "absolute",
            color: "white",
            fontSize: 24,
            fontFamily: "Bebas Neue",
            fontWeight: "400",
          }}
        >
          About marvel
        </div>
        <div
          style={{
            left: 501,
            top: 172,
            position: "absolute",
            color: "white",
            fontSize: 24,
            fontFamily: "Bebas Neue",
            fontWeight: "400",
          }}
        >
          Help/FAQS
        </div>

        <div
          style={{
            left: 1086,
            top: 157,
            position: "absolute",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 19,
            display: "inline-flex",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: 25,
                height: 24.94,
                left: 2.5,
                top: 2.56,
                position: "absolute",
                background: "black",
              }}
            />
          </div>
          <div style={{ width: 30, height: 30, background: "black" }} />
          <div style={{ width: 30, height: 30, background: "black" }} />
          <div style={{ width: 30, height: 30, background: "black" }} />
        </div>

        <div
          style={{
            left: 1118,
            top: 272,
            position: "absolute",
            color: "white",
            fontSize: 20,
            fontFamily: "Bebas Neue",
            fontWeight: "400",
          }}
        >
          ©2025 MARVEL
        </div>
      </div>
    </div>
  );
};

export default Footer;
