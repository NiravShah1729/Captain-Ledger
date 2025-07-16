// src/pages/Attendance.jsx
import React, { useState, useEffect } from "react";

function Attendance() {
  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState(null);
  const [timer, setTimer] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Generate a random 6-digit code
  const generateCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000);
    setGeneratedCode(newCode);
    setTimer(60); // 1-minute countdown
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Attendance</h1>

      {/* Admin Section */}
      <div className="mb-8 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-200 mb-2">
          Admin Control
        </h2>
        <button
          onClick={generateCode}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Generate 6-digit Code
        </button>
        {generatedCode && (
          <div className="mt-4 text-lg text-gray-300">
            <span className="font-mono text-2xl text-white">
              {generatedCode}
            </span>{" "}
            — expires in {timer}s
          </div>
        )}
      </div>

      {/* User Section */}
      <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-200 mb-2">
          Mark Attendance
        </h2>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          placeholder="Enter 6-digit code"
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white outline-none"
        />
        <button
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            if (code === String(generatedCode)) {
              alert("✅ Attendance Marked!");
            } else {
              alert("❌ Invalid Code!");
            }
          }}
        >
          Submit Code
        </button>
      </div>
    </div>
  );
}

export default Attendance;
