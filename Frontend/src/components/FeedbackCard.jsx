"use client";

import {
  Star,
  Calendar,
  CheckCircle,
  XCircle,
  MessageSquare,
} from "lucide-react";

export default function FeedbackCard({ feedback }) {
  const getCoordinationColor = (coordination) => {
    switch (coordination) {
      case "Excellent":
        return "bg-green-500";
      case "Good":
        return "bg-blue-500";
      case "Average":
        return "bg-yellow-500";
      case "Poor":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const StarRating = ({ rating }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-marvel-bg-tertiary rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h3 className="font-bebas text-2xl text-marvel-white tracking-wide mb-1">
            {feedback.mission.title}
          </h3>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(feedback.createdAt)}</span>
          </div>
        </div>
        <div className="mt-3 md:mt-0">
          <StarRating rating={feedback.rating} />
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Coordination Badge */}
        <div>
          <span className="text-gray-400 text-sm font-bebas tracking-wide">
            COORDINATION
          </span>
          <div className="mt-1">
            <span
              className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium ${getCoordinationColor(
                feedback.coordination
              )}`}
            >
              {feedback.coordination}
            </span>
          </div>
        </div>

        {/* Would Do Again */}
        <div>
          <span className="text-gray-400 text-sm font-bebas tracking-wide">
            WOULD DO AGAIN
          </span>
          <div className="mt-1 flex items-center gap-2">
            {feedback.wouldDoAgain ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">Yes</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-medium">No</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Comments */}
      {feedback.comments && (
        <div className="border-t border-gray-600 pt-4">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-gray-400 text-sm font-bebas tracking-wide block mb-1">
                COMMENTS
              </span>
              <p className="text-gray-300 leading-relaxed">
                {feedback.comments}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
