const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      enum: ["razorpay"],
      default: "razorpay",
    },
    razorpayReferenceId: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
    },
    status: {
      type: String,
      enum: ["created", "authorized", "captured", "failed"],
      default: "created",
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    method: {
      type: String,
    },
    contact: {
      type: String,
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
