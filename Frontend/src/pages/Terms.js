import React from "react";

const Terms = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
                Terms & Conditions
            </h1>

            <p className="text-slate-600 mb-4">
                By accessing and using the PizzaSlice website or placing an order
                through our platform, you agree to comply with the following terms
                and conditions. Please read them carefully.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
                Use of Website
            </h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-1">
                <li>Provide accurate contact information while placing an order</li>
                <li>Do not attempt to misuse or disrupt our ordering or payment system</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
                Orders & Preparation
            </h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-1">
                <li>All pizzas are prepared fresh after order confirmation</li>
                <li>Orders are confirmed only after successful payment</li>
                <li>Order preparation begins immediately after confirmation</li>
                <li>We reserve the right to refuse or cancel any order due to operational reasons</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
                Pricing & Payments
            </h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-1">
                <li>Prices and menu availability are subject to change without prior notice</li>
                <li>Online payments are securely processed via Razorpay</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
                Cancellations & Refunds
            </h2>
            <p className="text-slate-600">
                Cancellations and refunds are governed by our Refund & Cancellation Policy.
                Please review that page for complete details.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
                Limitation of Liability
            </h2>
            <p className="text-slate-600">
                We are not responsible for delays or failures caused by circumstances
                beyond our reasonable control, including technical issues or high order volumes.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
                Contact Information
            </h2>
            <p className="text-slate-600">
                For any questions regarding these terms, please contact us at:
            </p>
            <p className="text-slate-600 font-medium mt-1">
                📞 +91 9799 760328 <br />
                📧 Jaincreations48@gmail.com
            </p>
        </div>
    );
};

export default Terms;
