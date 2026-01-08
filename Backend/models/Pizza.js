const mongoose = require("mongoose");

const priceValidator = {
  validator(value) {
    return Array.isArray(value) && value.length > 0 && value.every((price) => typeof price === "number" && price >= 0);
  },
  message: "Prices must be a non-empty array of positive numbers",
};

const sizeValidator = {
  validator(value) {
    if (!Array.isArray(value) || value.length === 0) return false;
    const allowed = ["small", "medium", "large"];
    return value.every((size) => allowed.includes(size));
  },
  message: "Sizes must be an array with allowed values: small, medium, large",
};

const pizzaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 600,
    },
    prices: {
      type: [Number],
      required: true,
      validate: priceValidator,
    },
    sizes: {
      type: [String],
      required: true,
      validate: sizeValidator,
      default: ["small", "medium", "large"],
    },
    image: {
      type: String,
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

pizzaSchema.pre("save", function normalizeArrays(next) {
  if (this.sizes?.length && this.prices?.length && this.sizes.length !== this.prices.length) {
    return next(new Error("Sizes and prices must have the same length"));
  }
  next();
});

module.exports = mongoose.model("Pizza", pizzaSchema);
