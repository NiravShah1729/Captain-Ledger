import Feedback from "../models/Feedback.model.js"
import { asyncHandler  } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"

//Create feedback
const createFeedback = asyncHandler(async(req,res) => {
    
    const {mission, rating, coordination, wouldDoAgain, comments} = req.body;
    
    if (!mission || !rating || !coordination || typeof wouldDoAgain !== "boolean") {
        throw new apiError(400, "Required fields missing");
    }

    //check if already submitted
    const alreadyGiven = await Feedback.findOne({
      user: req.user._id,
      mission,
    });
    if (alreadyGiven) {
      throw new apiError(400, "Feedback already submitted for this mission");
    }

    const feedback = await Feedback.create({
        user: req.user._id,
        mission,
        rating,
        coordination,
        wouldDoAgain,
        comments,
    });

    return res
    .status(201)
    .json(new apiResponse(201,feedback,"Feedback submitted successfully"));
})

//get all feedbacks for a mission (for admin)
//feedback by ID (admin)
const getFeedbackForMission = asyncHandler(async(req,res) => {
    const {missionId} = req.params;

    const feedbacks = await Feedback.find({mission: missionId})
    .populate("user","name email")
    .populate("mission","title");

    return res
    .status(200)
    .json(new apiResponse(200,feedbacks,"Feedbacks for mission"));
})

export {
    createFeedback,
    getFeedbackForMission
}