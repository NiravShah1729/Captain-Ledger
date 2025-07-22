import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./pages/Posts";
import "./App.css";

export default function App() {
  return (
    <div className="bg-black min-h-screen relative overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostPage />} />
      </Routes>
    </div>
  );
}
