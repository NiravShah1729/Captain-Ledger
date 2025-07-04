import AttendenceSession from "../models/AttendenceSession.model.js";
import AttendenceRecord from "../models/AttendenceRecord.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

// Utility to generate random 6-digit code
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

//Admin creats attendence session (valid for 1 min)
const createAttendenceSession = asyncHandler(async(req,res) => {
  const code = generateCode();
  const expiresAt = new Date(Date.now() + 60 * 1000); // expires in 1 minute

  const session = await AttendenceSession.create({
    code,
    createdBy: req.user._id,
    expiresAt,
  })

  return res
  .status(201)
  .json(new apiResponse(201, {
    sessionId: session._id,
    code: session.code,
    expiresAt: session.expiresAt,
  }, "Attendence session started for 1 minute"))
})

const markAttendence = asyncHandler(async(req,res) => {
  const {code} = req.body;

  if(!code || code.length !== 6){
    throw new apiError(400,"Valid 6-digit code is required");
  }

  const session = await AttendenceSession.findOne({
    code,
    active: true,
    expiresAt: { $gt: new Date() },
  });

  if(!session){
    throw new apiError(400,"Invalid or expired code");
  }

  const alreadyMarked = await AttendenceRecord.findOne({
    session:session._id,
    user:req.user._id,

  })

  if(alreadyMarked){
    throw new apiError(400,"Attendence already marked");
  }

  const record = await AttendenceRecord.create({
    session: session._id,
    user:req.user._id,
    status: "present",
  })

  return res
    .status(200)
    .json(new apiResponse(200, record, "Attendance marked as present"));
})

const getAttendenceStatsById = asyncHandler(async(req,res) => {
  const { userId } = req.params;

  const records = await AttendenceRecord.find({ user: userId })
    .populate("session", "code expiresAt createdAt")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, records, "Attendance records fetched"));
})

const getAllAttendenceStats = asyncHandler(async(req,res) => {
  const records = await AttendenceRecord.find()
    .populate("user", "name email")
    .populate("session", "code expiresAt createdAt")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, records, "All attendance records fetched"));
})

export {
  markAttendence,
  createAttendenceSession,
  getAllAttendenceStats,
  getAttendenceStatsById
}