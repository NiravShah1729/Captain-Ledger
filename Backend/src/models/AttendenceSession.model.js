import mongoose  from "mongoose";

const attendenceSessionSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,//6 digit otp
        },

        active: {
            type:Boolean,
            default: true
        },
        createdBy: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        expiresAt:{
            type:Date,
            required:true,
        }

    },
    {
        timestamps:true,
    }
)

export default mongoose.model("AttendenceSession", attendenceSessionSchema)