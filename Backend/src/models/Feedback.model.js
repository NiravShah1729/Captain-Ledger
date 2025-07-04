import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mission",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    coordination: {
      type: String,
      enum: ["Excellent", "Good", "Average", "Poor"],
      required: true,
    },
    wouldDoAgain: {
      type: Boolean,
      required: true,
    },
    comments: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
