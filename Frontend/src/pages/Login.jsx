import React, { useState } from "react";
import { User, Lock, Mail, Signature } from "lucide-react";

/**
 * onAuthSuccess: function(loggedIn: boolean, userName: string, isAdmin: boolean)
 */
const Login = ({ onAuthSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    if (isRegistering) {
      if (!name) {
        setError("Please enter your name.");
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }

      const isAdminUser = email === "admin@example.com";
      onAuthSuccess(true, name, isAdminUser);
      setLoading(false);
      return;
    } else {
      if (email === "admin@example.com" && password === "password123") {
        onAuthSuccess(true, "AdminUser", true);
      } else if (password === "password123" && validateEmail(email)) {
        onAuthSuccess(true, email.split("@")[0], false);
      } else {
        setError("Invalid email or password.");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

          html, body, #root {
            height: 100%;
            margin: 0;
            padding: 0;
          }

          .font-smoothing-auto {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
        `}
      </style>
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#2E2E2E] to-[#202020] font-['Bebas_Neue'] text-white font-smoothing-auto p-4">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-xl shadow-2xl max-w-md w-full border border-white border-opacity-20">
          <h1 className="text-4xl text-[#ED1D24] text-center mb-8 tracking-wider">
            AVENGERS INITIATIVE
          </h1>
          <h2 className="text-2xl text-white text-center mb-6 tracking-wider">
            {isRegistering ? "SIGN UP" : "LOGIN"}
          </h2>

          <form onSubmit={handleAuth} className="flex flex-col gap-6">
            {isRegistering && (
              <div className="relative">
                <Signature
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="NAME"
                  className="w-full p-3 pl-10 rounded-md bg-white bg-opacity-5 border border-white border-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:border-[#ED1D24] tracking-wider"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="relative">
              <Mail
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                placeholder="EMAIL"
                className="w-full p-3 pl-10 rounded-md bg-white bg-opacity-5 border border-white border-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:border-[#ED1D24] tracking-wider"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <Lock
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                placeholder="PASSWORD"
                className="w-full p-3 pl-10 rounded-md bg-white bg-opacity-5 border border-white border-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:border-[#ED1D24] tracking-wider"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isRegistering && (
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="password"
                  placeholder="CONFIRM PASSWORD"
                  className="w-full p-3 pl-10 rounded-md bg-white bg-opacity-5 border border-white border-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:border-[#ED1D24] tracking-wider"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            {error && (
              <p className="text-red-400 text-center text-sm tracking-wider">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-4 py-3 px-6 rounded-md bg-[#ED1D24] hover:bg-red-700 transition-colors duration-300 text-white text-xl uppercase font-bold tracking-widest"
              disabled={loading}
            >
              {loading
                ? "PROCESSING..."
                : isRegistering
                ? "REGISTER"
                : "ACCESS SECURE NETWORK"}
            </button>
          </form>

          <p
            className="text-center text-gray-400 text-sm mt-8 tracking-wider cursor-pointer hover:text-white"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError("");
              setName("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
            }}
          >
            {isRegistering
              ? "Already have an account? Login here."
              : "New recruit? Sign up here."}
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
