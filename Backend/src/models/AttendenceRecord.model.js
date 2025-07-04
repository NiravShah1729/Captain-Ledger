import mongoose from "mongoose";

const attendenceRecordSchema = new mongoose.Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AttendenceSession",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["present", "absent"],
    default: "present",
  },
  markedAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("AttendanceRecord", attendenceRecordSchema);
