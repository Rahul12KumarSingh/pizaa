const express = require("express");
const { body } = require("express-validator");
const {
    createCategory,
    listCategories,
} = require("../controllers/categoryController");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

// Validation rules
const categoryValidation = [
    body("name")
        .isString()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("Name must be between 2 and 100 characters"),
    body("description")
        .optional()
        .isString()
        .trim()
        .isLength({ max: 300 })
        .withMessage("Description must not exceed 300 characters"),
    body("image").optional().isString().trim(),
    body("displayOrder").optional().isInt({ min: 0 }).withMessage("Display order must be a positive integer"),
];


/**
 * @route   GET /api/categories
 * @desc    Get all active categories
 */
router.get("/", listCategories);


/**
 * @route   POST /api/categories
 * @desc    Create a new category
*/
router.post("/", categoryValidation, validateRequest, createCategory);



module.exports = router;
