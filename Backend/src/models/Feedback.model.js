import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        message: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Feedback", feedbackSchema);