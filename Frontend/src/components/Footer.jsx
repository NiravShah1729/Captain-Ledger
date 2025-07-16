import React from "react";
import marvelLogo from "../assets/pictures/marvel.jpeg"; // Adjust path if needed
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "../assets/fonts/font.css"; // Bebas Neue

const Footer = () => {
  return (
    <footer className="bg-[#202020] text-white py-12 px-6 font-bebas">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
        {/* Left Section: Logo + Links */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Logo */}
          <img
            src={marvelLogo}
            alt="Marvel Logo"
            className="w-[160px] h-auto"
          />

          {/* Links */}
          <div className="text-lg space-y-1 text-center md:text-left leading-tight tracking-wide">
            <p>ABOUT MARVEL</p>
            <p>HELP/FAQS</p>
          </div>
        </div>

        {/* Right Section: Social Icons */}
        <div className="flex gap-5 text-2xl">
          <FaFacebookF />
          <FaInstagram />
          <FaTwitter />
          <FaYoutube />
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-base mt-8 tracking-wide">
        ©2025 MARVEL
      </div>
    </footer>
  );
};

export default Footer;
