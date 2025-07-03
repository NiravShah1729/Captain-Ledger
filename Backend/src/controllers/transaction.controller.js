import Transactions from "../models/Transaction.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import { apiError } from "../utils/apiError.js"
import mongoose from "mongoose"

//Create a new transaction

const createTransaction = asyncHandler(async(req,res) => {
    const {to,amount,description} = req.body;

    if(!to || !amount){
        throw new apiError(400, "Receiver and amount are required");
    }

    if(!mongoose.Types.ObjectId.isValid(to)){
        throw new apiError(400,"Invalid recipient user ID")
    }
    
    //allowing only to send upto 10000
    if(req.user.role !== "admin" && amount > 10000){
        throw new apiError(403, "User can only send up to ₹10,000 per transaction")
    }

    const transaction = await Transactions.create({
        from: req.user._id,
        to,
        amount,
        description,
    });

    return res
    .status(201)
    .json(new apiResponse(201, transaction,"Transaction successfull"))
})

//get all transactions for the current user

const getUserTransactions = asyncHandler(async(req,res) => {
    const transaction = await Transactions.find({
      $or: [{ from: req.user._id }, { to: req.user._id }],
    })
    .populate("from","name email")
    .populate("to","name email")
    .sort({createdAt: -1});

    return res
    .status(200)
    .json(new apiResponse(200, transaction))

})

//get all transactions(admins)

const getAllTransactions = asyncHandler(async(req,res) => {
    if(req.user.role !== "admin"){
        throw new apiError(403, "Only admins can access all transactions");
    }

    const transaction = await Transactions.find()
    .populate("from","name email")
    .populate("to","name email")
    .sort({createdAt : -1});

    return res
    .status(200)
    .json(new apiResponse(200, transaction));
})

//Deleting a transaction
const deleteTransaction = asyncHandler(async(req,res) => {
    const {id} = req.params;

    const transaction = await Transactions.findById(id);
    if(!transaction){
        throw new apiError(404, "Transaction not found");
    }

    const isOwner = transaction.from.toString() === req.user._id.toString();

    if(!isOwner && req.user.role !== "admin"){
        throw new apiError(403, "You are not allowed to delete this transaction");
    }

    await transaction.deleteOne();

    return res
    .status(200)
    .json(new apiResponse(200, {}, "Transaction deleted successfully"));
})

const getUserBalance = asyncHandler(async (req, res) => {
  const sent = await Transactions.aggregate([
    { $match: { from: req.user._id } },
    { $group: { _id: null, totalSent: { $sum: "$amount" } } },
  ]);

  const received = await Transactions.aggregate([
    { $match: { to: req.user._id } },
    { $group: { _id: null, totalReceived: { $sum: "$amount" } } },
  ]);

  const totalSent = sent[0]?.totalSent || 0;
  const totalReceived = received[0]?.totalReceived || 0;

  const balance = totalReceived - totalSent;

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { totalSent, totalReceived, balance },
        "Balance fetched"
      )
    );
});
  

export {
    createTransaction,
    getAllTransactions,
    getUserTransactions,
    deleteTransaction,
    getUserBalance
}