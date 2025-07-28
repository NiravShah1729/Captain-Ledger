"use client";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FeedbackForm from "@/components/FeedbackForm";
import FeedbackHistory from "@/components/FeedbackHistory";
import { Shield } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState("form");
  const [refreshHistory, setRefreshHistory] = useState(0);

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
  };
  const activeTabNav = pathToTab[location.pathname] || "";

  const handleFeedbackSubmitted = () => {
    setRefreshHistory((prev) => prev + 1);
    setActiveTab("history");
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
      setShowNavbar(false);
    } else if (window.scrollY < lastScrollY) {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="bg-black min-h-screen relative overflow-x-hidden">
      {/* Navbar */}
      <Navbar
        currentUserName={currentUserName || "GUEST"}
        showNavbar={showNavbar}
        activeTab={activeTabNav}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        onNavAttempt={handleNavAttempt}
      />
      {/* Add padding to the top of the content to prevent it from being hidden by the fixed navbar */}
      <div className="pt-[133px]"></div>{" "}
      {/* Height of navbar: 51px + 41px + 41px = 133px */}
      <div className="min-h-screen bg-marvel-bg text-marvel-white">
        {/* Header */}
        <div className="bg-marvel-bg-secondary border-b border-marvel-bg-tertiary">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-marvel-red" />
              <h1 className="font-bebas text-4xl text-marvel-white tracking-wider">
                MISSION FEEDBACK SYSTEM
              </h1>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 bg-marvel-bg-tertiary rounded-lg p-1">
              <button
                onClick={() => setActiveTab("form")}
                className={`px-6 py-3 rounded-md font-bebas text-lg tracking-wide transition-all ${
                  activeTab === "form"
                    ? "bg-marvel-red text-marvel-white shadow-lg"
                    : "text-gray-400 hover:text-marvel-white hover:bg-marvel-bg-secondary"
                }`}
              >
                SUBMIT FEEDBACK
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-6 py-3 rounded-md font-bebas text-lg tracking-wide transition-all ${
                  activeTab === "history"
                    ? "bg-marvel-red text-marvel-white shadow-lg"
                    : "text-gray-400 hover:text-marvel-white hover:bg-marvel-bg-secondary"
                }`}
              >
                FEEDBACK HISTORY
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {activeTab === "form" ? (
            <FeedbackForm onFeedbackSubmitted={handleFeedbackSubmitted} />
          ) : (
            <FeedbackHistory key={refreshHistory} />
          )}
        </div>
      </div>
      {/* Footer */}
      <Footer />
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Login Required</h2>
              <p className="mb-4">Please log in to access this feature.</p>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => setShowLoginModal(false)}
              >
                Close
              </button>
            </div>
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-red-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700"
              onClick={() => setShowLoginModal(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
