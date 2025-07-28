"use client";

import { useState, useEffect } from "react";
import { Star, Send, AlertCircle } from "lucide-react";

export default function FeedbackForm({ onFeedbackSubmitted }) {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    mission: "",
    rating: 0,
    coordination: "",
    wouldDoAgain: false,
    comments: "",
  });

  const coordinationOptions = [
    { value: "Excellent", color: "bg-green-500" },
    { value: "Good", color: "bg-blue-500" },
    { value: "Average", color: "bg-yellow-500" },
    { value: "Poor", color: "bg-red-500" },
  ];

  useEffect(() => {
    fetchMissions();
  }, []);

  const fetchMissions = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with actual endpoint
      const mockMissions = [
        {
          _id: "1",
          title: "Avengers Assembly",
          description: "Gather the team",
        },
        {
          _id: "2",
          title: "Hydra Infiltration",
          description: "Covert operation",
        },
        {
          _id: "3",
          title: "Cosmic Threat Response",
          description: "Space mission",
        },
        {
          _id: "4",
          title: "City Defense Protocol",
          description: "Urban protection",
        },
      ];
      setMissions(mockMissions);
    } catch (err) {
      setError("Failed to load missions");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.mission || !formData.rating || !formData.coordination) {
      setError("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // Mock API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("Feedback submitted successfully!");
      setFormData({
        mission: "",
        rating: 0,
        coordination: "",
        wouldDoAgain: false,
        comments: "",
      });

      setTimeout(() => {
        setSuccess("");
        onFeedbackSubmitted();
      }, 2000);
    } catch (err) {
      setError("Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  const StarRating = () => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
          className="transition-all hover:scale-110"
        >
          <Star
            className={`w-8 h-8 ${
              star <= formData.rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-600 hover:text-yellow-400"
            }`}
          />
        </button>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-marvel-red"></div>
      </div>
    );
  }

  return (
    <div className="bg-marvel-bg-secondary rounded-lg p-8 shadow-2xl">
      <h2 className="font-bebas text-3xl text-marvel-white mb-8 tracking-wider">
        SUBMIT MISSION FEEDBACK
      </h2>

      {error && (
        <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-400">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-900/50 border border-green-500 rounded-lg p-4 mb-6 flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-green-400"></div>
          <span className="text-green-400">{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Mission Selection */}
        <div>
          <label className="block font-bebas text-xl text-marvel-white mb-3 tracking-wide">
            SELECT MISSION *
          </label>
          <select
            value={formData.mission}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, mission: e.target.value }))
            }
            className="w-full bg-marvel-bg-tertiary border border-gray-600 rounded-lg px-4 py-3 text-marvel-white focus:border-marvel-red focus:outline-none transition-colors"
            required
          >
            <option value="">Choose a mission...</option>
            {missions.map((mission) => (
              <option key={mission._id} value={mission._id}>
                {mission.title}
              </option>
            ))}
          </select>
        </div>

        {/* Star Rating */}
        <div>
          <label className="block font-bebas text-xl text-marvel-white mb-3 tracking-wide">
            MISSION RATING *
          </label>
          <StarRating />
          <p className="text-gray-400 text-sm mt-2">
            {formData.rating > 0 && `${formData.rating} out of 5 stars`}
          </p>
        </div>

        {/* Coordination Level */}
        <div>
          <label className="block font-bebas text-xl text-marvel-white mb-3 tracking-wide">
            TEAM COORDINATION *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {coordinationOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    coordination: option.value,
                  }))
                }
                className={`p-3 rounded-lg border-2 transition-all font-bebas text-lg tracking-wide ${
                  formData.coordination === option.value
                    ? `${option.color} border-transparent text-white`
                    : "bg-marvel-bg-tertiary border-gray-600 text-gray-300 hover:border-gray-400"
                }`}
              >
                {option.value}
              </button>
            ))}
          </div>
        </div>

        {/* Would Do Again */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.wouldDoAgain}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  wouldDoAgain: e.target.checked,
                }))
              }
              className="w-5 h-5 text-marvel-red bg-marvel-bg-tertiary border-gray-600 rounded focus:ring-marvel-red focus:ring-2"
            />
            <span className="font-bebas text-xl text-marvel-white tracking-wide">
              WOULD PARTICIPATE IN SIMILAR MISSIONS
            </span>
          </label>
        </div>

        {/* Comments */}
        <div>
          <label className="block font-bebas text-xl text-marvel-white mb-3 tracking-wide">
            ADDITIONAL COMMENTS
          </label>
          <textarea
            value={formData.comments}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, comments: e.target.value }))
            }
            rows={4}
            className="w-full bg-marvel-bg-tertiary border border-gray-600 rounded-lg px-4 py-3 text-marvel-white focus:border-marvel-red focus:outline-none transition-colors resize-none"
            placeholder="Share your thoughts about the mission..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-marvel-red hover:bg-red-700 disabled:bg-gray-600 text-marvel-white font-bold py-4 px-6 rounded-lg transition-colors font-bebas text-xl tracking-wider flex items-center justify-center gap-3"
        >
          {submitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              SUBMITTING...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              SUBMIT FEEDBACK
            </>
          )}
        </button>
      </form>
    </div>
  );
}
