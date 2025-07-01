import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        role : {
            type: String,
            enum: ["admin", "avenger"],
            default : "avenger"
        },
        balance: {
            type: Number,
            default: 0
        },
        attendence: {
            type: Number,
            default: 0
        },
        totalSessions: {
            type: Number,
            default: 0
        }
        
    },
    {
        timestamps: true
    }
)

export default mongoose.model("User", userSchema);