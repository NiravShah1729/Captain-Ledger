import { useRef, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MissionSection from "./components/MissionSection";
import avengersVideo from "./assets/videos/avengers-intro.mp4";
import "./App.css";
import Home from "./pages/Home";

export default function App() {
  const videoRef = useRef(null);
  const [showContent, setShowContent] = useState(false);

  // Optional: Prevent scrolling when video is playing
  useEffect(() => {
    if (!showContent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showContent]);

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
          onEnded={() => setShowContent(true)}
        />
      ) : (
        <div className="bg-black min-h-screen w-screen">
          <Home />
        </div>
      )}
    </div>
  );
}
