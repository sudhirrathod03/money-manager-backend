const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    amount: { type: Number, required: [true, "Amount is required"] },
    type: { type: String, required: [true, "Type is required"] }, 
    category: { type: String, required: [true, "Category is required"] },
    account: { type: String, required: [true, "Account is required"] }, 
    division: { type: String, required: [true, "Division is required"] },
    description: { type: String, required: [true, "Description is required"] },
    date: { type: Date, required: [true, "Date is required"] },
    reference: { type: String }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
