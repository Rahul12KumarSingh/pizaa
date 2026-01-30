import React from "react";

const Terms = () => {
    return (
        <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen py-12 px-2">
            <div className="max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-2xl px-6 sm:px-10 py-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 text-center drop-shadow-lg">
                    Terms &amp; Conditions
                </h1>

                <p className="text-blue-800 mb-6 text-lg text-center">
                    By accessing and using the Santorini flavours website or placing an order
                    through our platform, you agree to comply with the following terms
                    and conditions. Please read them carefully.
                </p>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-2 mt-6">Use of Website</h2>
                        <ul className="list-disc pl-6 text-blue-700 space-y-1">
                            <li>Provide accurate contact information while placing an order</li>
                            <li>Do not attempt to misuse or disrupt our ordering or payment system</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-2 mt-6">Orders &amp; Preparation</h2>
                        <ul className="list-disc pl-6 text-blue-700 space-y-1">
                            <li>All pizzas are prepared fresh after order confirmation</li>
                            <li>Orders are confirmed only after successful payment</li>
                            <li>Order preparation begins immediately after confirmation</li>
                            <li>We reserve the right to refuse or cancel any order due to operational reasons</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-2 mt-6">Pricing &amp; Payments</h2>
                        <ul className="list-disc pl-6 text-blue-700 space-y-1">
                            <li>Prices and menu availability are subject to change without prior notice</li>
                            <li>Online payments are securely processed via Razorpay</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-2 mt-6">Cancellations &amp; Refunds</h2>
                        <p className="text-blue-700">
                            Cancellations and refunds are governed by our Refund &amp; Cancellation Policy.
                            Please review that page for complete details.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-2 mt-6">Limitation of Liability</h2>
                        <p className="text-blue-700">
                            We are not responsible for delays or failures caused by circumstances
                            beyond our reasonable control, including technical issues or high order volumes.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-2 mt-6">Contact Information</h2>
                        <p className="text-blue-700">
                            For any questions regarding these terms, please contact us at:
                        </p>
                        <p className="text-blue-900 font-semibold mt-1">
                            📞 +91 8905191233 <br />
                            📧 santoriniflavours@gmail.com
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
