const mongoose = require("mongoose");
const { ORDER_STATUS } = require("../constants/orderStatus");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    // Flexible size field - supports any size label (small, medium, large, regular, jumbo, etc.)
    // Null for single-price items without size variants
    size: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    paymentReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    customerMobileNumber: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.RECEIVED,
      index: true,
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    receiptNumber: {
      type: String,
      unique: true,
    },
    placedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
