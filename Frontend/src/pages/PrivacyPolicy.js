import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen py-12 px-2">
            <div className="max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-2xl px-6 sm:px-10 py-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 text-center drop-shadow-lg">
                    Privacy Policy
                </h1>

                <p className="text-blue-800 mb-6 text-lg text-center">
                    We value your privacy and are committed to protecting your personal
                    information. This Privacy Policy explains how Santorini flavours collects,
                    uses, and safeguards your data when you place orders through our website
                    or visit our shop.
                </p>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-2 mt-6">Information We Collect</h2>
                        <ul className="list-disc pl-6 text-blue-700 space-y-1">
                            <li>Customer name and mobile number</li>
                            <li>Order details such as items selected and quantity</li>
                            <li>Pickup or order reference information</li>
                            <li>Payment status and transaction reference ID</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-2 mt-6">How We Use Your Information</h2>
                        <ul className="list-disc pl-6 text-blue-700 space-y-1">
                            <li>To confirm and prepare your pizza order</li>
                            <li>To notify our staff/admin about new orders</li>
                            <li>To communicate with you regarding order status</li>
                            <li>To resolve payment or order-related issues</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-2 mt-6">Payment Information</h2>
                        <p className="text-blue-700 mb-3">
                            All online payments on our website are securely processed through
                            Razorpay. We do not store or have access to your card, UPI, or banking
                            details.
                        </p>
                        <p className="text-blue-700">
                            Razorpay may collect and process your payment information in accordance
                            with their own privacy policies and security standards.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-2 mt-6">Data Sharing</h2>
                        <p className="text-blue-700">
                            We do not sell, rent, or share your personal data with third parties
                            except payment service providers strictly for processing transactions
                            or when required by law.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-2 mt-6">Data Security</h2>
                        <p className="text-blue-700">
                            We take reasonable measures to protect your information from
                            unauthorized access, misuse, or disclosure.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-2 mt-6">Contact Us</h2>
                        <p className="text-blue-700">
                            If you have any questions about this Privacy Policy or your data,
                            please contact us at:
                        </p>
                        <p className="text-blue-900 font-semibold mt-1">
                            📞 +91 8905191233<br />
                            📧 santoriniflavours@gmail.com
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
