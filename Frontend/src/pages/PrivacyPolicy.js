import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
                Privacy Policy
            </h1>

            <p className="text-slate-600 mb-4">
                We value your privacy and are committed to protecting your personal
                information. This Privacy Policy explains how PizzaSlice collects,
                uses, and safeguards your data when you place orders through our website
                or visit our shop.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
                Information We Collect
            </h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-1">
                <li>Customer name and mobile number</li>
                <li>Order details such as items selected and quantity</li>
                <li>Pickup or order reference information</li>
                <li>Payment status and transaction reference ID</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
                How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-1">
                <li>To confirm and prepare your pizza order</li>
                <li>To notify our staff/admin about new orders</li>
                <li>To communicate with you regarding order status</li>
                <li>To resolve payment or order-related issues</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
                Payment Information
            </h2>
            <p className="text-slate-600 mb-3">
                All online payments on our website are securely processed through
                Razorpay. We do not store or have access to your card, UPI, or banking
                details.
            </p>
            <p className="text-slate-600">
                Razorpay may collect and process your payment information in accordance
                with their own privacy policies and security standards.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
                Data Sharing
            </h2>
            <p className="text-slate-600">
                We do not sell, rent, or share your personal data with third parties
                except payment service providers strictly for processing transactions
                or when required by law.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
                Data Security
            </h2>
            <p className="text-slate-600">
                We take reasonable measures to protect your information from
                unauthorized access, misuse, or disclosure.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
                Contact Us
            </h2>
            <p className="text-slate-600">
                If you have any questions about this Privacy Policy or your data,
                please contact us at:
            </p>
            <p className="text-slate-600 font-medium mt-1">
                📞 +91 9799 760328 <br />
                📧 Jaincreations48@gmail.com
            </p>
        </div>
    );
};

export default PrivacyPolicy;
