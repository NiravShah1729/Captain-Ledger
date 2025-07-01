import mongoose from "mongoose";

const missionSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description: String,
    status :{
        type:String,
        enum: ["ongoing","completed","failed","martyred"],
        default: "ongoing",
    },
    assignedTo: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

},
{
    timestamps:true
}
)

export default mongoose.model("Mission", missionSchema)