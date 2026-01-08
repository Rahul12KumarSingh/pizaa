const Razorpay = require("razorpay");

let razorpayInstance;

const getRazorpayInstance = () => {
    if (!razorpayInstance) {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            throw new Error("Razorpay credentials are not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET");
        }
        razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }
    return razorpayInstance;
};

const createRazorpayOrder = async ({ amount, currency = "INR", receipt, notes = {} }) => {
    const instance = getRazorpayInstance();
    const payload = {
        amount,
        currency,
        receipt,
        notes,
        payment_capture: 1,
    };
    return instance.orders.create(payload);
};

module.exports = {
    createRazorpayOrder,
};
