import Mission from "../models/Mission.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"

//Create a new Mission
const createMission = asyncHandler(async(req,res) => {
    const {title, description, assignedTo} = req.body;

    if(!title){
        throw new apiError(400, "Mission title is required")
    }

    const newMission = await Mission.create({title, description, assignedTo});

    return res
    .status(201)
    .json(new apiResponse(201, newMission, "Mission created successfully"));
})

//Get all missions
const getAllMissions = asyncHandler(async(req,res) => {
    const missions = await Mission.find().populate("assignedTo","name email")

    return res
    .status(200)
    .json(new apiResponse(200,missions, "All mission fetched"));
})

//Get mission by ID
const getMissionById = asyncHandler(async(req,res) => {
    const {id} = req.params;

    const mission = await Mission.findById(id).populate("assignedTo","name email");

    if(!mission){
        throw new apiError(404, "Mission not found");
    }

    return res
    .status(200)
    .json(new apiResponse(200,mission,"Mission fetched successfully"));
})

//Update mission
const updateMission = asyncHandler(async(req,res) => {
    const {id} = req.params;
    // console.log(req.body); 
    
    const updatedMission = await Mission.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("assignedTo", "name email");
      

    if(!updatedMission){
        throw new apiError(404, "Mission not found");
    }

    return res
    .status(200)
    .json(new apiResponse(200, updatedMission,"Mission updated successfully"));
})

//delete mission by ID
const deleteMission = asyncHandler(async(req,res) => {
    const {id} = req.params;

    const deletedMission = await Mission.findByIdAndDelete(id);

    if(!deletedMission){
        throw new apiError(404,"Mission not found");
    }
    return res
    .status(200)
    .json(new apiResponse(200,{},"Mission deleted successfully"));
})

export {
    createMission,
    getAllMissions,
    getMissionById,
    updateMission,
    deleteMission
}