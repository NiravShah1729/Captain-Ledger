import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation for activeTab
import Navbar from "../components/Navbar"; // Import the Navbar component

import MissionSection from "../components/MissionSection"; // Assuming these paths are correct
import HeroSection from "../components/HeroSection"; // Assuming these paths are correct
import Footer from "../components/Footer";

import avengersVideo from "../assets/videos/avengers-intro.mp4"; // Corrected path based on previous examples
import LoginPage from "./Login";

export default function Home() {
  const videoRef = useRef(null);
  // Only show video if not played in this session
  const [showContent, setShowContent] = useState(() => {
    return sessionStorage.getItem("videoPlayed") === "true";
  });

  // State for navbar animation
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingNav, setPendingNav] = useState(null);
  const [currentUserName, setCurrentUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Determine active tab for Navbar
  const location = useLocation();
  const pathToTab = {
    "/posts": "POSTS",
    "/missions": "MISSIONS",
    "/heroes": "HEROES",
    "/attendence": "ATTENDENCE",
    "/transactions": "TRANSACTIONS",
    "/feedback": "FEEDBACK",
    "/": "HOME", // Mark home as active when on root path
  };
  const activeTab = pathToTab[location.pathname] || "";

  useEffect(() => {
    document.body.style.overflow = showContent ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showContent]);

  // Clear the flag on reload so video plays on every reload

  const handleVideoEnd = () => {
    sessionStorage.setItem("videoPlayed", "true");
    setShowContent(true);
  };

  const handleNavAttempt = (link) => {
    setPendingNav(link);
    setShowLoginModal(true);
  };

  const handleAuthSuccess = (loggedIn, userName, adminFlag) => {
    setIsLoggedIn(loggedIn);
    setCurrentUserName(userName);
    setIsAdmin(!!adminFlag);
    setShowLoginModal(false);
    // Only navigate if pendingNav is a real page, not LOGIN
    if (pendingNav && pendingNav !== "LOGIN") {
      window.location.href = `/${pendingNav.toLowerCase()}`;
      setPendingNav(null);
    } else {
      setPendingNav(null);
    }
  };

  // Handle scroll for navbar animation
  const handleScroll = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      // Scrolling down
      setShowNavbar(false);
    } else if (window.scrollY < lastScrollY) {
      // Scrolling up
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]); // Re-run effect if lastScrollY changes

  return (
    <div className="bg-black min-h-screen relative overflow-x-hidden">
      {!showContent ? (
        <video
          ref={videoRef}
          src={avengersVideo}
          autoPlay
          muted
          playsInline
          className="fixed top-0 left-0 w-screen h-screen object-cover z-50"
          onEnded={handleVideoEnd}
        />
      ) : (
        <>
          {/* Render the Navbar component here */}
          <Navbar
            currentUserName={currentUserName || "GUEST"}
            showNavbar={showNavbar}
            activeTab={activeTab}
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            onNavAttempt={handleNavAttempt}
          />
          {/* Add padding to the top of the content to prevent it from being hidden by the fixed navbar */}
          <div className="pt-[133px]"></div>{" "}
          {/* Height of navbar: 51px + 41px + 41px = 133px */}
          <MissionSection />
          <HeroSection />
          <Footer />
          {showLoginModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
              <div className="relative">
                <LoginPage onAuthSuccess={handleAuthSuccess} />
                <button
                  className="absolute top-2 right-2 text-white text-2xl bg-red-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700"
                  onClick={() => setShowLoginModal(false)}
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
