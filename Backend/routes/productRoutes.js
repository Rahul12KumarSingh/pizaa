const express = require("express");
const { body, param } = require("express-validator");
const {
    createProduct,
    getMenu,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

// Validation for variant objects
const variantValidation = [
    body("variants").optional().isArray().withMessage("Variants must be an array"),
    body("variants.*.size")
        .if(body("variants").exists())
        .isString()
        .trim()
        .notEmpty()
        .withMessage("Each variant must have a size"),
    body("variants.*.price")
        .if(body("variants").exists())
        .isFloat({ min: 0 })
        .withMessage("Each variant price must be a positive number"),
    body("variants.*.isAvailable").optional().isBoolean(),
];

// Validation rules for creating/updating products
const productValidation = [
    body("title")
        .isString()
        .trim()
        .isLength({ min: 2, max: 150 })
        .withMessage("Title must be between 2 and 150 characters"),
    body("description")
        .optional()
        .isString()
        .trim()
        .isLength({ max: 600 })
        .withMessage("Description must not exceed 600 characters"),
    body("category").isMongoId().withMessage("Valid category ID is required"),
    body("price").optional({ nullable: true }).isFloat({ min: 0 }).withMessage("Price must be a positive number"),
    ...variantValidation,
    body("image").optional().isString().trim(),
    body("isAvailable").optional().isBoolean(),
    body("displayOrder").optional().isInt({ min: 0 }).withMessage("Display order must be a positive integer"),
    body("tags").optional().isArray(),
    body("tags.*").optional().isString().trim(),
];

const idValidation = [param("id").isMongoId().withMessage("Invalid product ID")];


/**
 * @route   GET /api/products/menu
 * @desc    Get products grouped by category (for menu display)
 */
router.get("/menu", getMenu);


/**
 * @route   POST /api/products
 * @desc    Create a new product
 */
router.post("/", productValidation, validateRequest, createProduct);


/**
 * @route   PUT /api/products/:id
 * @desc    Update an existing product
 */
router.put("/:id", idValidation, productValidation, validateRequest, updateProduct);


/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 */
router.delete("/:id", idValidation, validateRequest, deleteProduct);


module.exports = router;
