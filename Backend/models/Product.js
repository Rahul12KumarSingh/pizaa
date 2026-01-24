const mongoose = require("mongoose");


const variantSchema = new mongoose.Schema(
    {
        size: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    { _id: false }
);


const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 150,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 600,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
            index: true,
        },
        // Single price for items without size variants (e.g., Water Bottle, Cold Drinks)
        price: {
            type: Number,
            min: 0,
            default: null,
        },
        // Size-based pricing for items with variants (e.g., Pizza, Fries, Shakes)
        variants: {
            type: [variantSchema],
            default: [],
        },
        image: {
            type: String,
            trim: true,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        displayOrder: {
            type: Number,
            default: 0,
        },

        tags: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

// Virtual to determine pricing type ("variants" or "single")
productSchema.virtual("pricingType").get(function () {
    return this.variants && this.variants.length > 0 ? "variants" : "single";
});

// Validation: Must have either price or variants
productSchema.pre("save", function (next) {
    const hasPrice = this.price !== null && this.price !== undefined && this.price > 0;
    const hasVariants = this.variants && this.variants.length > 0;

    if (!hasPrice && !hasVariants) {
        return next(new Error("Product must have either a price or variants"));
    }

    if (hasVariants && hasPrice) {
        return next(new Error("Cannot have both price and variants"));
    }

    next();
});


module.exports = mongoose.model("Product", productSchema);
