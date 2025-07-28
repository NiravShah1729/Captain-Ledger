import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./pages/Posts";
import Mission from "./pages/Mission";
import HeroPage from "./pages/Heros";
import Attendance from "./pages/Attendance";
import MoneyTransfer from "./pages/MoneyTransfer";
import Feedback from "./pages/Feedback";
import "./App.css";

export default function App() {
  return (
    <div className="bg-black min-h-screen relative overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/missions" element={<Mission />} />
        <Route path="/heroes" element={<HeroPage />} />
        <Route path="/attendence" element={<Attendance />} />
        <Route path="/transactions" element={<MoneyTransfer />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </div>
  );
}
