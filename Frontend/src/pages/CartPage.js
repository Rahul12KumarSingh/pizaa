import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addItem,
    clearCart,
    decrementItem,
    removeItem,
    selectCartItems,
    selectCartTotal,
} from "../store/cartSlice";
import { ShoppingBag, Minus, Plus, ArrowLeft, Trash2, Download, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { generateReceiptPDF } from "../utils/generateReceipt";

const BRAND_NAME = "Santorini flavours";
const LOGO_URL = `${process.env.PUBLIC_URL}/assets/Logo.ico`;

const loadRazorpay = () => {
    if (document.getElementById("razorpay-sdk")) {
        return Promise.resolve(true);
    }

    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "razorpay-sdk";
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const CartPage = ({ onNavigateHome }) => {
    const dispatch = useDispatch();
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    const [customer, setCustomer] = useState({ name: "", phone: "" });
    const [receiptData, setReceiptData] = useState(null);
    const [status, setStatus] = useState({ loading: false, success: "", error: "" });

    const formattedTotal = useMemo(() => total.toFixed(2), [total]);

    useEffect(() => {
        if (receiptData) {
            generateReceiptPDF(receiptData);
        }
    }, [receiptData]);

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (!customer.name.trim()) return "Please enter your name.";
        if (!/^\d{10}$/.test(customer.phone)) return "Enter a valid 10 digit mobile number.";
        if (!items.length) return "Your cart is empty.";
        return "";
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        const validationError = validate();// phone number validation..

        if (validationError) {
            setStatus({ loading: false, success: "", error: validationError });
            return;
        }
        const orderItemsPayload = items.map((item) => ({
            pizzaId: item.id,
            size: item.size,
            quantity: item.quantity,
        }));

        setStatus({ loading: true, success: "", error: "" });

        try {
            const sdkLoaded = await loadRazorpay();

            if (!sdkLoaded || !window.Razorpay) {
                setStatus({ loading: false, success: "", error: "Unable to load Razorpay SDK. Please retry." });
                return;
            }

            const { data: orderResponse } = await api.post("/orders/razorpay/order", {
                customerName: customer.name,
                customerMobileNumber: customer.phone,
                items: orderItemsPayload,
            });

            const orderData = orderResponse?.data;

            if (!orderData?.key || !orderData?.razorpayOrderId) {
                throw new Error("Failed to create payment order. Please try again.");
            }

            await new Promise((resolve, reject) => {
                const razorpay = new window.Razorpay({
                    key: orderData.key,
                    amount: orderData.amount,
                    currency: orderData.currency,
                    order_id: orderData.razorpayOrderId,
                    name: BRAND_NAME,
                    description: "Order payment",
                    prefill: {
                        name: customer.name,
                        contact: customer.phone,
                    },
                    notes: { receipt: orderData.receipt },
                    theme: { color: "#e11d48" },
                    handler: async (response) => {
                        try {
                            const { data: paymentResponse } = await api.post("/orders/payment", {
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpayOrderId: response.razorpay_order_id,
                                razorpaySignature: response.razorpay_signature,
                                amount: orderData.amount,
                                currency: orderData.currency,
                                contact: customer.phone,
                                customerName: customer.name,
                                customerMobileNumber: customer.phone,
                                items: orderItemsPayload,
                                notes: { receipt: orderData.receipt },
                            });

                            const receipt = paymentResponse?.data?.receipt || orderData.receipt;
                            const orderId = paymentResponse?.data?.order?._id || orderData.razorpayOrderId;

                            // Store receipt data for PDF generation
                            setReceiptData({
                                orderId,
                                receipt,
                                customerName: customer.name,
                                customerMobileNumber: customer.phone,
                                items: items.map(item => ({
                                    name: item.name,
                                    size: item.size,
                                    quantity: item.quantity,
                                    price: item.price,
                                })),
                                totalAmount: total,
                                shopName: BRAND_NAME,
                                logoUrl: LOGO_URL,
                            });

                            dispatch(clearCart());
                            setCustomer({ name: "", phone: "" });
                            setStatus({
                                loading: false,
                                success: `Payment successful! Receipt: ${receipt}`,
                                error: "",
                            });
                            resolve();
                        } catch (confirmError) {
                            setStatus({
                                loading: false,
                                success: "",
                                error: confirmError.message || "Payment verification failed.",
                            });
                            reject(confirmError);
                        }
                    },
                    modal: {
                        ondismiss: () => {
                            setStatus({ loading: false, success: "", error: "Payment cancelled." });
                            reject(new Error("Payment cancelled"));
                        },
                    },
                });

                razorpay.on("payment.failed", (response) => {
                    setStatus({
                        loading: false,
                        success: "",
                        error: response.error?.description || "Payment failed.",
                    });
                    reject(new Error(response.error?.description || "Payment failed"));
                });

                razorpay.open();
            });
        } catch (error) {
            if (!/cancelled/i.test(error.message || "")) {
                setStatus({ loading: false, success: "", error: error.message || "Payment failed" });
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

            <div className="flex items-center gap-2 mb-6">
                <button
                    onClick={onNavigateHome}
                    className="flex items-center text-sm font-semibold text-slate-600 hover:text-rose-600"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back
                </button>

                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-rose-600" /> Your Cart
                </h2>
            </div>

            {items.length === 0 ? (
                <div className="bg-white rounded-xl p-6 shadow-soft text-center">
                    <p className="text-slate-600">Your cart is empty. Add some delicious pizzas!</p>
                    <button
                        onClick={onNavigateHome}
                        className="mt-4 bg-rose-600 text-white px-4 py-2 rounded-full font-semibold"
                    >
                        Browse menu
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-3">
                        {items.map((item) => (
                            <div
                                key={`${item.id}-${item.size}`}
                                className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between gap-3"
                            >
                                <div className="flex items-center gap-3">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-16 w-16 rounded-lg object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="h-16 w-16 rounded-lg bg-slate-100" />
                                    )}
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-900">{item.name}</h4>
                                        <p className="text-xs text-slate-500">Size: {item.size}</p>
                                        <p className="text-sm font-semibold text-rose-600">₹{item.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">

                                    <button
                                        onClick={() => dispatch(decrementItem({ id: item.id, size: item.size }))}
                                        className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-200 text-slate-700"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>

                                    <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>

                                    <button
                                        onClick={() => dispatch(addItem({ ...item }))}
                                        className="h-9 w-9 flex items-center justify-center rounded-full bg-rose-600 text-white"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>

                                    <button
                                        onClick={() => dispatch(removeItem({ id: item.id, size: item.size }))}
                                        className="ml-2 h-9 w-9 flex items-center justify-center rounded-full border border-transparent text-rose-600 hover:bg-rose-50"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl shadow-soft border border-slate-100 p-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Subtotal</span>
                            <span className="text-lg font-bold text-slate-900">₹{formattedTotal}</span>
                        </div>

                        <form onSubmit={handleCheckout} className="space-y-3">
                            <div>
                                <label className="text-xs font-semibold text-slate-600">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={customer.name}
                                    onChange={handleFieldChange}
                                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
                                    placeholder="Your full name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-600">Mobile number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={customer.phone}
                                    onChange={handleFieldChange}
                                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
                                    placeholder="10 digit mobile"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status.loading}
                                className="w-full bg-rose-600 text-white rounded-full py-3 font-semibold shadow-md hover:bg-rose-700 disabled:opacity-60"
                            >
                                {status.loading ? "Processing..." : `Pay ₹${formattedTotal}`}
                            </button>
                            <p className="text-xs text-slate-500 leading-relaxed text-center sm:text-left">
                                By placing this order you agree to our
                                <Link to="/terms-and-conditions" className="text-rose-600 font-semibold underline ml-1">
                                    Terms & Conditions
                                </Link>
                                .
                            </p>
                        </form>

                        {status.error && (
                            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
                                {status.error}
                            </div>
                        )}

                        {status.success && (
                            <div className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg p-3 space-y-3">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <span>{status.success}</span>
                                </div>
                                {receiptData && (
                                    <button
                                        onClick={() => generateReceiptPDF(receiptData)}
                                        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download Receipt (PDF)
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        setReceiptData(null);
                                        onNavigateHome?.();
                                    }}
                                    className="w-full bg-slate-200 text-slate-700 py-2 rounded-lg font-semibold hover:bg-slate-300 transition"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
