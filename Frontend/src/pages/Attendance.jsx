"use client";

import { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- Utility Components ---

/**
 * CountdownTimer Component
 * Displays a countdown timer for an active session.
 */
const CountdownTimer = ({ expiresAt, onSessionEnd }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    if (!expiresAt) {
      setRemainingSeconds(0);
      return;
    }

    const calculateRemaining = () => {
      const now = Date.now();
      const end = new Date(expiresAt).getTime();
      const diff = Math.max(0, Math.floor((end - now) / 1000));
      setRemainingSeconds(diff);

      if (diff === 0 && onSessionEnd) {
        onSessionEnd();
      }
    };

    calculateRemaining(); // Initial calculation
    const interval = setInterval(calculateRemaining, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onSessionEnd]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (!expiresAt || remainingSeconds <= 0) {
    return <span className="text-gray-500">Session inactive</span>;
  }

  return (
    <span className="text-[#ED1D24] font-bold text-lg">
      {formatTime(remainingSeconds)} remaining
    </span>
  );
};

/**
 * AttendanceTable Component
 * Displays attendance records based on the role.
 */
const AttendanceTable = ({ role, userId, attendanceRecords, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-400">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ED1D24] mx-auto mb-4"></div>
        Loading attendance records...
      </div>
    );
  }

  if (!attendanceRecords || attendanceRecords.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No attendance records found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-[#202020] text-white">
        <thead>
          <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Code</th>
            {role === "admin" && (
              <th className="py-3 px-6 text-left">User Name</th>
            )}
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Marked At</th>
            {role === "admin" && (
              <th className="py-3 px-6 text-left">Session Expiration</th>
            )}
          </tr>
        </thead>
        <tbody className="text-gray-200 text-sm font-light">
          {attendanceRecords.map((record) => (
            <tr
              key={record._id}
              className="border-b border-gray-700 hover:bg-gray-700"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {record.code}
              </td>
              {role === "admin" && (
                <td className="py-3 px-6 text-left">
                  {record.userName || "N/A"}
                </td>
              )}
              <td className="py-3 px-6 text-left">
                <span
                  className={`py-1 px-3 rounded-full text-xs font-semibold ${
                    record.status === "marked"
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {record.status}
                </span>
              </td>
              <td className="py-3 px-6 text-left">
                {new Date(record.markedAt).toLocaleString()}
              </td>
              {role === "admin" && (
                <td className="py-3 px-6 text-left">
                  {record.sessionExpiresAt
                    ? new Date(record.sessionExpiresAt).toLocaleString()
                    : "N/A"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Admin Components ---

/**
 * CreateSessionCard Component (Admin Only)
 * Allows admin to create attendance sessions.
 */
const CreateSessionCard = ({
  onSessionCreated,
  currentSessionCode,
  currentSessionExpiresAt,
  onSessionExpired,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);

  useEffect(() => {
    setIsSessionActive(
      !!currentSessionCode &&
        new Date(currentSessionExpiresAt).getTime() > Date.now()
    );
  }, [currentSessionCode, currentSessionExpiresAt]);

  const handleCreateSession = async () => {
    setIsLoading(true);
    try {
      // Simulate API call for creating session
      const dummyCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
      const dummyExpiresAt = new Date(Date.now() + 60 * 1000).toISOString(); // 1 minute from now

      // In a real app, you'd make an actual axios call here:
      // const response = await axios.post("/api/attendance/create-session");
      // const { code, expiresAt } = response.data;

      toast.success("Attendance session created!");
      onSessionCreated(dummyCode, dummyExpiresAt);
    } catch (error) {
      console.error("Error creating session:", error);
      toast.error("Failed to create session.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#202020] p-6 rounded-lg shadow-lg mb-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4">
        Admin Section: Create Attendance Session
      </h2>
      <button
        onClick={handleCreateSession}
        disabled={isLoading || isSessionActive}
        className={`w-full py-3 px-6 rounded-md font-semibold text-white transition-colors duration-300 ${
          isLoading || isSessionActive
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-[#ED1D24] hover:bg-red-700"
        }`}
      >
        {isLoading
          ? "Creating..."
          : isSessionActive
          ? "Session Active"
          : "Create Attendance Session"}
      </button>

      {currentSessionCode && (
        <div className="mt-6 text-center">
          <p className="text-gray-300 text-lg mb-2">Generated Code:</p>
          <p className="text-5xl font-extrabold text-[#ED1D24] tracking-widest mb-4">
            {currentSessionCode}
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-400">Expires in:</span>
            <CountdownTimer
              expiresAt={currentSessionExpiresAt}
              onSessionEnd={onSessionExpired}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// --- User Components ---

/**
 * CodeInputForm Component (User Only)
 * Allows users to input a code and mark attendance.
 */
const CodeInputForm = ({
  userId,
  onAttendanceMarked,
  currentSessionCode,
  currentSessionExpiresAt,
}) => {
  const [inputCode, setInputCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);

  useEffect(() => {
    setIsSessionActive(
      !!currentSessionCode &&
        new Date(currentSessionExpiresAt).getTime() > Date.now()
    );
  }, [currentSessionCode, currentSessionExpiresAt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputCode || inputCode.length !== 6) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }
    if (!isSessionActive) {
      toast.error(
        "No active attendance session. Please wait for admin to create one."
      );
      return;
    }
    if (inputCode !== currentSessionCode) {
      toast.error("Invalid code. Please try again.");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call for marking attendance
      // In a real app, you'd make an actual axios call here:
      // const response = await axios.post("/api/attendance/mark", { userId, code: inputCode });
      // toast.success(response.data.message || "Attendance marked successfully!");

      // Dummy response logic
      // For demonstration, we'll assume the code is valid if it matches currentSessionCode
      // In a real app, the backend would validate against the active session.
      toast.success("Attendance marked successfully!");

      onAttendanceMarked(); // Refresh user's stats
      setInputCode(""); // Clear input
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error(error.message || "Failed to mark attendance.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#202020] p-6 rounded-lg shadow-lg mb-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4">
        User Section: Mark Attendance
      </h2>

      {isSessionActive ? (
        <div className="mb-6 text-center">
          <p className="text-gray-300 text-lg mb-2">Active Session Code:</p>
          <p className="text-5xl font-extrabold text-[#ED1D24] tracking-widest mb-4">
            {currentSessionCode}
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-400">Expires in:</span>
            <CountdownTimer expiresAt={currentSessionExpiresAt} />
          </div>
        </div>
      ) : (
        <div className="mb-6 text-center text-gray-400">
          No active attendance session. Please wait for the admin to create one.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value.slice(0, 6))} // Limit to 6 characters
          placeholder="Enter 6-digit code"
          maxLength={6}
          disabled={!isSessionActive}
          className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-[#ED1D24] focus:ring-1 focus:ring-[#ED1D24] disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isLoading || inputCode.length !== 6 || !isSessionActive}
          className={`w-full py-3 px-6 rounded-md font-semibold text-white transition-colors duration-300 ${
            isLoading || inputCode.length !== 6 || !isSessionActive
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#ED1D24] hover:bg-red-700"
          }`}
        >
          {isLoading ? "Submitting..." : "Mark Attendance"}
        </button>
      </form>
    </div>
  );
};

// --- Main AttendancePage Component ---

const Attendance = ({ role = "user", userId = "user123" }) => {
  // Global state for active session (shared between admin/user for display)
  const [currentSessionCode, setCurrentSessionCode] = useState(null);
  const [currentSessionExpiresAt, setCurrentSessionExpiresAt] = useState(null);

  // State for attendance records
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isRecordsLoading, setIsRecordsLoading] = useState(false);

  // Callback for when admin creates a session
  const handleSessionCreated = useCallback(
    (code, expiresAt) => {
      setCurrentSessionCode(code);
      setCurrentSessionExpiresAt(expiresAt);
      // Optionally refresh admin stats immediately
      if (role === "admin") {
        fetchAttendanceRecords();
      }
    },
    [role]
  );

  // Callback for when a session expires on frontend
  const handleSessionExpired = useCallback(() => {
    setCurrentSessionCode(null);
    setCurrentSessionExpiresAt(null);
    toast.info("Attendance session has expired.");
    // Refresh stats to reflect expired sessions if needed
    fetchAttendanceRecords();
  }, []);

  // Function to fetch attendance records
  const fetchAttendanceRecords = useCallback(async () => {
    setIsRecordsLoading(true);
    try {
      // Simulate API call for fetching records
      // In a real app, you'd make an actual axios call here:
      // let response;
      // if (role === "admin") {
      //   response = await axios.get("/api/attendance/stats");
      // } else {
      //   response = await axios.get(`/api/attendance/stats/${userId}`);
      // }
      // const data = response.data;

      // Dummy data for demonstration
      const now = new Date();
      const dummyData = [
        {
          _id: "rec1",
          code: "123456",
          userName: "Tony Stark",
          status: "marked",
          markedAt: new Date(now.getTime() - 5 * 60 * 1000).toISOString(), // 5 mins ago
          sessionExpiresAt: new Date(
            now.getTime() - 4 * 60 * 1000
          ).toISOString(), // 4 mins ago (expired)
        },
        {
          _id: "rec2",
          code: "789012",
          userName: "Steve Rogers",
          status: "marked",
          markedAt: new Date(now.getTime() - 15 * 60 * 1000).toISOString(), // 15 mins ago
          sessionExpiresAt: new Date(
            now.getTime() - 14 * 60 * 1000
          ).toISOString(), // 14 mins ago (expired)
        },
        {
          _id: "rec3",
          code: "345678",
          userName: "Tony Stark",
          status: "marked",
          markedAt: new Date(now.getTime() - 2 * 60 * 1000).toISOString(), // 2 mins ago
          sessionExpiresAt: new Date(
            now.getTime() - 1 * 60 * 1000
          ).toISOString(), // 1 min ago (expired)
        },
        {
          _id: "rec4",
          code: "901234",
          userName: "Natasha Romanoff",
          status: "marked",
          markedAt: new Date(now.getTime() - 30 * 1000).toISOString(), // 30 secs ago
          sessionExpiresAt: new Date(now.getTime() + 30 * 1000).toISOString(), // 30 secs from now (active)
        },
      ];

      let dataToSet = [];
      if (role === "admin") {
        dataToSet = dummyData;
      } else {
        // Filter dummy data for the specific user
        dataToSet = dummyData.filter(
          (record) => record.userName === "Tony Stark" && userId === "user123"
        ); // Assuming Tony Stark is user123
      }

      // Ensure dataToSet is an array before setting state
      if (Array.isArray(dataToSet)) {
        setAttendanceRecords(dataToSet);
      } else {
        console.warn(
          "Simulated data for attendance records was not an array:",
          dataToSet
        );
        setAttendanceRecords([]); // Default to empty array if not an array
      }
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      toast.error("Failed to fetch attendance records.");
      setAttendanceRecords([]); // Ensure it's an empty array on error
    } finally {
      setIsRecordsLoading(false);
    }
  }, [role, userId]);

  // Initial fetch and auto-refresh
  useEffect(() => {
    fetchAttendanceRecords();

    // Auto-refresh stats every 10 seconds (Bonus)
    const refreshInterval = setInterval(fetchAttendanceRecords, 10000); // 10 seconds

    return () => clearInterval(refreshInterval);
  }, [fetchAttendanceRecords]);

  return (
    <>
      <Navbar
        currentUserName="Tony Stark"
        showNavbar={true}
        isLoggedIn={true}
        isAdmin={role === "admin"}
        onNavAttempt={() => {}}
      />
      <div style={{ height: "120px" }} /> {/* Adjust to your navbar height */}
      <main className="min-h-screen bg-[#2E2E2E] text-white font-sans p-4 sm:p-6 lg:p-8 pt-40">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-[#ED1D24] mb-8">
            Attendance Management
          </h1>

          {/* Role-specific sections */}
          {role === "admin" ? (
            <CreateSessionCard
              onSessionCreated={handleSessionCreated}
              currentSessionCode={currentSessionCode}
              currentSessionExpiresAt={currentSessionExpiresAt}
              onSessionExpired={handleSessionExpired}
            />
          ) : (
            <CodeInputForm
              userId={userId}
              onAttendanceMarked={fetchAttendanceRecords}
              currentSessionCode={currentSessionCode}
              currentSessionExpiresAt={currentSessionExpiresAt}
            />
          )}

          {/* Attendance Records Table */}
          <div className="bg-[#202020] p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              {role === "admin"
                ? "All Attendance Records"
                : "Your Attendance Records"}
            </h2>
            <AttendanceTable
              role={role}
              userId={userId}
              attendanceRecords={attendanceRecords}
              isLoading={isRecordsLoading}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Attendance;
