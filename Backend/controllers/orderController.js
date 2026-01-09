const crypto = require("crypto");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const Pizza = require("../models/Pizza");
const { ORDER_STATUS, PROGRESS_STATUSES } = require("../constants/orderStatus");
const { buildReadableId } = require("../utils/id");
const { createRazorpayOrder: createRazorpayOrderService } = require("../services/razorpayService");

const buildHttpError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

const verifySignature = ({ orderId, paymentId, signature, secret }) => {
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto.createHmac("sha256", secret).update(body).digest("hex");
    return expectedSignature === signature;
};

const materializeOrderItems = (items, pizzaMap) => {
    if (!Array.isArray(items) || items.length === 0) {
        throw buildHttpError(400, "At least one item is required to create an order");
    }
    let totalAmount = 0;
    const hydratedItems = items.map((item) => {
        const pizza = pizzaMap.get(item.pizzaId);
        if (!pizza) {
            throw buildHttpError(400, `Pizza item ${item.pizzaId} not found or unavailable`);
        }
        const sizeIndex = pizza.sizes.findIndex((size) => size === item.size);
        if (sizeIndex === -1) {
            throw buildHttpError(400, `Size ${item.size} is not offered for ${pizza.title}`);
        }
        const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;
        const unitPrice = pizza.prices[sizeIndex];
        totalAmount += unitPrice * quantity;
        return {
            pizza: pizza._id,
            title: pizza.title,
            size: pizza.sizes[sizeIndex],
            price: unitPrice,
            quantity,
        };
    });
    return { hydratedItems, totalAmount };
};

const createRazorpayOrder = async (req, res, next) => {
    try {
        const { items = [], notes = {}, customerName, customerMobileNumber } = req.body;

        if (!process.env.RAZORPAY_KEY_ID) {
            throw buildHttpError(500, "RAZORPAY_KEY_ID is not configured on the server");
        }

        const pizzaIds = items.map((item) => item.pizzaId);
        const pizzas = await Pizza.find({ _id: { $in: pizzaIds }, isAvailable: true }).lean();
        const pizzaMap = new Map(pizzas.map((pizza) => [pizza._id.toString(), pizza]));
        const { hydratedItems, totalAmount } = materializeOrderItems(items, pizzaMap);

        const amountInPaise = Math.round(totalAmount * 100);
        if (!amountInPaise || amountInPaise <= 0) {
            throw buildHttpError(400, "Calculated order amount must be greater than zero");
        }

        const receipt = buildReadableId("RZP");

        const order = await createRazorpayOrderService({
            amount: amountInPaise,
            currency: "INR",
            receipt,
            notes: {
                ...notes,
                customerName,
                customerMobileNumber,
            },
        });

        return res.status(201).json({
            success: true,
            data: {
                razorpayOrderId: order.id,
                amount: order.amount,
                currency: order.currency,
                receipt: order.receipt,
                status: order.status,
                key: process.env.RAZORPAY_KEY_ID,
                totalAmount,
                items: hydratedItems,
            },
        });

    } catch (error) {
        return next(error);
    }
};

const createOrderFromPayment = async (req, res, next) => {
    try {
        const {
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            amount,
            currency = "INR",
            method,
            email,
            contact,
            customerName,
            customerMobileNumber,
            items = [],
            notes = {},
        } = req.body;

        if (!process.env.RAZORPAY_KEY_SECRET) {
            throw buildHttpError(500, "RAZORPAY_KEY_SECRET is not configured on the server");
        }

        const pizzaIds = items.map((item) => item.pizzaId);
        const pizzas = await Pizza.find({ _id: { $in: pizzaIds }, isAvailable: true }).lean();
        const pizzaMap = new Map(pizzas.map((pizza) => [pizza._id.toString(), pizza]));
        const { hydratedItems, totalAmount } = materializeOrderItems(items, pizzaMap);
        const expectedAmountPaise = Math.round(totalAmount * 100);

        if (typeof amount === "number" && Math.abs(expectedAmountPaise - amount) > 1) {
            throw buildHttpError(400, "Payment amount mismatch detected");
        }

        const signatureValid = verifySignature({
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
            signature: razorpaySignature,
            secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const paymentStatus = signatureValid ? "captured" : "failed";

        const paymentRecord = await Payment.create({
            provider: "razorpay",
            razorpayReferenceId: razorpayPaymentId,
            razorpayOrderId,
            signature: razorpaySignature,
            status: paymentStatus,
            amount,
            currency,
            method,
            email,
            contact,
            meta: { notes },
        });

        if (!signatureValid) {
            throw buildHttpError(400, "Invalid Razorpay signature. Payment could not be verified.");
        }

        const orderId = buildReadableId("ORD");
        const receiptNumber = buildReadableId("RCP");

        const order = await Order.create({
            orderId,
            paymentReference: paymentRecord._id,
            customerName,
            customerMobileNumber,
            status: ORDER_STATUS.PROCESSING,
            items: hydratedItems,
            totalAmount,
            receiptNumber,
            placedAt: new Date(),
        });

        return res.status(201).json({
            success: true,
            data: {
                order,
                receipt: receiptNumber,
            },
        });

    } catch (error) {
        return next(error);
    }
};

// const getProgressOrdersSummary = async (req, res, next) => {
//     try {
//         const summary = await Order.aggregate([
//             { $match: { status: { $in: PROGRESS_STATUSES } } },
//             { $group: { _id: "$status", count: { $sum: 1 } } },
//         ]);
//         const base = PROGRESS_STATUSES.reduce((acc, statusKey) => ({ ...acc, [statusKey]: 0 }), {});
//         const formatted = summary.reduce(
//             (acc, item) => ({
//                 ...acc,
//                 [item._id]: item.count,
//             }),
//             base
//         );
//         return res.status(200).json({ success: true, data: formatted });
//     } catch (error) {
//         return next(error);
//     }
// };

const getProgressOrders = async (req, res, next) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const parsedLimit = Math.min(Number(limit) || 20, 100);
        const parsedPage = Math.max(Number(page) || 1, 1);

        const statuses = status ? [status] : PROGRESS_STATUSES;
        const query = { status: { $in: statuses } };

        const [orders, total] = await Promise.all([
            Order.find(query)
                .sort({ createdAt: -1 })
                .skip((parsedPage - 1) * parsedLimit)
                .limit(parsedLimit)
                .populate("paymentReference", "status amount currency")
                .lean(),
            Order.countDocuments(query),
        ]);

        return res.status(200).json({
            success: true,
            data: orders,
            meta: {
                total,
                page: parsedPage,
                limit: parsedLimit,
                totalPages: Math.ceil(total / parsedLimit) || 1,
            },
        });
    } catch (error) {
        return next(error);
    }
};

const markOrderDelivered = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOne({ orderId });
        if (!order) {
            throw buildHttpError(404, "Order not found");
        }
        if (order.status === ORDER_STATUS.DELIVERED) {
            return res.status(200).json({ success: true, message: "Order already delivered", data: order });
        }
        order.status = ORDER_STATUS.DELIVERED;
        await order.save();
        return res.status(200).json({ success: true, message: "Order marked as delivered", data: order });
    } catch (error) {
        return next(error);
    }
};

const getOrdersByDate = async (req, res, next) => {
    try {
        const { date } = req.query;
        if (!date) {
            throw buildHttpError(400, "Query param 'date' (YYYY-MM-DD) is required");
        }
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        if (Number.isNaN(start.getTime())) {
            throw buildHttpError(400, "Invalid date value provided");
        }

        const orders = await Order.find({ placedAt: { $gte: start, $lte: end } })
            .sort({ placedAt: -1 })
            .lean();

        return res.status(200).json({ success: true, data: orders });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    createRazorpayOrder,
    createOrderFromPayment,
    // getProgressOrdersSummary,
    getProgressOrders,
    markOrderDelivered,
    getOrdersByDate,
};
