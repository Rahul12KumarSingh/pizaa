const crypto = require("crypto");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const Product = require("../models/Product");
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

/**
 * Materialize order items from product IDs
 * Supports both single-price products and variant-based products
 */
const materializeOrderItems = (items, productMap) => {
    if (!Array.isArray(items) || items.length === 0) {
        throw buildHttpError(400, "At least one item is required to create an order");
    }

    let totalAmount = 0;
    const hydratedItems = items.map((item) => {
        const product = productMap.get(item.productId);
        if (!product) {
            throw buildHttpError(400, `Product ${item.productId} not found or unavailable`);
        }

        const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;
        let unitPrice;
        let size = null;

        // Check if product has variants (size-based pricing)
        if (product.variants && product.variants.length > 0) {
            if (!item.size) {
                throw buildHttpError(400, `Size is required for ${product.title}`);
            }

            const variant = product.variants.find(
                (v) => v.size.toLowerCase() === item.size.toLowerCase() && v.isAvailable !== false
            );

            if (!variant) {
                throw buildHttpError(400, `Size "${item.size}" is not available for ${product.title}`);
            }

            unitPrice = variant.price;
            size = variant.size;
        } else {
            // Single-price product
            if (product.price === null || product.price === undefined) {
                throw buildHttpError(400, `Product ${product.title} has no valid price`);
            }
            unitPrice = product.price;
        }

        totalAmount += unitPrice * quantity;

        return {
            product: product._id,
            title: product.title,
            size,
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

        const productIds = items.map((item) => item.productId);
        const products = await Product.find({ _id: { $in: productIds }, isAvailable: true }).lean();
        const productMap = new Map(products.map((product) => [product._id.toString(), product]));
        const { hydratedItems, totalAmount } = materializeOrderItems(items, productMap);

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

        const productIds = items.map((item) => item.productId);
        const products = await Product.find({ _id: { $in: productIds }, isAvailable: true }).lean();
        const productMap = new Map(products.map((product) => [product._id.toString(), product]));
        const { hydratedItems, totalAmount } = materializeOrderItems(items, productMap);
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
