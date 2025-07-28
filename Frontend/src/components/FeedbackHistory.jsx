"use client";

import { useState, useEffect } from "react";
import FeedbackCard from "@/components/FeedbackCard";
import { History, AlertCircle } from "lucide-react";

export default function FeedbackHistory() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with actual endpoint
      const mockFeedbacks = [
        {
          _id: "1",
          mission: { _id: "1", title: "Avengers Assembly" },
          rating: 5,
          coordination: "Excellent",
          wouldDoAgain: true,
          comments:
            "Outstanding teamwork and execution. The team responded perfectly to every challenge.",
          createdAt: "2024-01-15T10:30:00Z",
        },
        {
          _id: "2",
          mission: { _id: "2", title: "Hydra Infiltration" },
          rating: 4,
          coordination: "Good",
          wouldDoAgain: true,
          comments:
            "Solid mission overall, though communication could have been better during the stealth phase.",
          createdAt: "2024-01-10T14:45:00Z",
        },
        {
          _id: "3",
          mission: { _id: "3", title: "Cosmic Threat Response" },
          rating: 3,
          coordination: "Average",
          wouldDoAgain: false,
          comments:
            "Mission was too chaotic. Need better preparation for cosmic-level threats.",
          createdAt: "2024-01-05T09:15:00Z",
        },
        {
          _id: "4",
          mission: { _id: "4", title: "City Defense Protocol" },
          rating: 5,
          coordination: "Excellent",
          wouldDoAgain: true,
          createdAt: "2023-12-28T16:20:00Z",
        },
      ];

      await new Promise((resolve) => setTimeout(resolve, 800));
      setFeedbacks(mockFeedbacks);
    } catch (err) {
      setError("Failed to load feedback history");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-marvel-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-marvel-bg-secondary rounded-lg p-8 shadow-2xl">
        <div className="flex items-center gap-3 text-red-400">
          <AlertCircle className="w-6 h-6" />
          <span className="font-bebas text-xl tracking-wide">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-marvel-bg-secondary rounded-lg p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <History className="w-8 h-8 text-marvel-red" />
        <h2 className="font-bebas text-3xl text-marvel-white tracking-wider">
          FEEDBACK HISTORY
        </h2>
      </div>

      {feedbacks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-marvel-bg-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
            <History className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-400 font-bebas text-xl tracking-wide">
            NO FEEDBACK SUBMITTED YET
          </p>
          <p className="text-gray-500 mt-2">
            Submit your first mission feedback to see it here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {feedbacks.map((feedback) => (
            <FeedbackCard key={feedback._id} feedback={feedback} />
          ))}
        </div>
      )}
    </div>
  );
}
