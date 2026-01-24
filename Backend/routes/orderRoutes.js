const express = require("express");
const { body, param, query } = require("express-validator");
const {
    createRazorpayOrder,
    createOrderFromPayment,
    getProgressOrders,
    markOrderDelivered,
    getOrdersByDate,
} = require("../controllers/orderController");
const validateRequest = require("../middleware/validateRequest");
const { ORDER_STATUS } = require("../constants/orderStatus");

const router = express.Router();

router.post(
    "/razorpay/order",
    [
        body("customerName").isString().trim().isLength({ min: 2 }).withMessage("Customer name is required"),
        body("customerMobileNumber")
            .isString()
            .matches(/^[0-9]{10}$/)
            .withMessage("Customer mobile number must be a valid 10 digit number"),
        body("items").isArray({ min: 1 }).withMessage("Items array is required"),
        body("items.*.productId").isMongoId().withMessage("Each item must include a valid productId"),
        body("items.*.size").optional().isString().trim().withMessage("Size must be a string"),
        body("items.*.quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    ],
    validateRequest,
    createRazorpayOrder
);

router.post(
    "/payment",
    [
        body("razorpayPaymentId").isString().withMessage("razorpayPaymentId is required"),
        body("razorpayOrderId").isString().withMessage("razorpayOrderId is required"),
        body("razorpaySignature").isString().withMessage("razorpaySignature is required"),
        body("amount").isNumeric().withMessage("Amount must be numeric"),
        body("customerName").isString().trim().isLength({ min: 2 }).withMessage("Customer name is required"),
        body("customerMobileNumber")
            .isString()
            .matches(/^[0-9]{10}$/)
            .withMessage("Customer mobile number must be a valid 10 digit number"),
        body("items").isArray({ min: 1 }).withMessage("Items array is required"),
        body("items.*.productId").isMongoId().withMessage("Each item must include a valid productId"),
        body("items.*.size").optional().isString().trim().withMessage("Size must be a string"),
        body("items.*.quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    ],
    validateRequest,
    createOrderFromPayment
);

router.get(
    "/progress",
    [query("status").optional().isIn(Object.values(ORDER_STATUS)).withMessage("Invalid status")],
    validateRequest,
    getProgressOrders
);

router.patch(
    "/:orderId/deliver",
    [param("orderId").isString().withMessage("orderId is required")],
    validateRequest,
    markOrderDelivered
);

router.get(
    "/date",
    [query("date").isISO8601().withMessage("date query param must be in YYYY-MM-DD format")],
    validateRequest,
    getOrdersByDate
);

module.exports = router;
