import mongoose from "mongoose";

const attendanceRecordSchema = new mongoose.Schema(
  {
    session: { type: mongoose.Schema.Types.ObjectId, ref: "AttendanceSession" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    markedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("AttendanceRecord", attendanceRecordSchema);
