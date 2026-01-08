const express = require("express");
const { body } = require("express-validator");
const { createPizza, listPizzas } = require("../controllers/pizzaController");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

router.get("/", listPizzas);

router.post(
    "/",
    [
        body("title").isString().trim().isLength({ min: 2 }).withMessage("Title is required"),
        body("description").isString().isLength({ min: 10 }).withMessage("Description must be at least 10 characters"),
        body("prices").isArray({ min: 1 }).withMessage("Prices must be an array"),
        body("prices.*").isFloat({ min: 0 }).withMessage("Each price must be a valid number"),
        body("sizes").isArray({ min: 1 }).withMessage("Sizes must be an array"),
        body("sizes.*")
            .isIn(["small", "medium", "large"])
            .withMessage("Sizes must be one of small, medium, or large"),
    ],
    validateRequest,
    createPizza
);

module.exports = router;
