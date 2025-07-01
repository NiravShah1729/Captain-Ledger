import mongoose, { mongo, trusted } from "mongoose";
const transactionSchema = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        amount: {
            type: Number,
            required: true
        },
        description: String,
    },
    {
        timestamps:true
    }
)

export default mongoose.model("Transaction", transactionSchema)