import React from "react";

const RefundPolicy = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
                Refund & Cancellation Policy
            </h1>

            <p className="text-slate-600 mb-4">
                Our pizzas are freshly prepared after an order is confirmed.
                Please read our refund and cancellation policy carefully before
                placing an order.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
                Order Cancellation
            </h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-1">
                <li>
                    Orders can be cancelled only if the preparation has not yet started.
                </li>
                <li>
                    Once preparation begins, cancellation requests will not be accepted.
                </li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
                Refund Eligibility
            </h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-1">
                <li>Payment was successful but the order was not prepared</li>
                <li>Duplicate payment or technical payment failure</li>
                <li>Order could not be fulfilled due to shop-related issues</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
                Refund Process
            </h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-1">
                <li>
                    Customers must contact us with their order reference or payment ID.
                </li>
                <li>
                    Once approved, refunds will be initiated to the original payment
                    method.
                </li>
                <li>
                    Refunds are typically processed within <strong>5–7 working days</strong>,
                    depending on the bank or payment provider.
                </li>
            </ul>

            <p className="text-slate-600 mt-6">
                All online payments on our website are processed securely via Razorpay.
                Refund timelines may vary based on the payment method and bank policies.
            </p>

            <p className="text-slate-600 mt-4">
                For any refund or order-related queries, please contact us at:
            </p>
            <p className="text-slate-600 font-medium mt-1">
                📞   +91 9799760328 <br />
                📧   Jaincreations48@gmail.com
            </p>
        </div>
    );
};

export default RefundPolicy;
