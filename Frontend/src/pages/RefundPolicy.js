import React from "react";

const RefundPolicy = () => {
    return (
        <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen py-12 px-2">
            <div className="max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-2xl px-6 sm:px-10 py-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 text-center drop-shadow-lg">
                    Refund &amp; Cancellation Policy
                </h1>

                <p className="text-blue-800 mb-6 text-lg text-center">
                    Our pizzas are freshly prepared after an order is confirmed.
                    Please read our refund and cancellation policy carefully before
                    placing an order.
                </p>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-2 mt-6">Order Cancellation</h2>
                        <ul className="list-disc pl-6 text-blue-700 space-y-1">
                            <li>Orders can be cancelled only if the preparation has not yet started.</li>
                            <li>Once preparation begins, cancellation requests will not be accepted.</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-2 mt-6">Refund Eligibility</h2>
                        <ul className="list-disc pl-6 text-blue-700 space-y-1">
                            <li>Payment was successful but the order was not prepared</li>
                            <li>Duplicate payment or technical payment failure</li>
                            <li>Order could not be fulfilled due to shop-related issues</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-2 mt-6">Refund Process</h2>
                        <ul className="list-disc pl-6 text-blue-700 space-y-1">
                            <li>Customers must contact us with their order reference or payment ID.</li>
                            <li>Once approved, refunds will be initiated to the original payment method.</li>
                            <li>Refunds are typically processed within <span className="font-semibold">5–7 working days</span>, depending on the bank or payment provider.</li>
                        </ul>
                    </section>
                    <section>
                        <p className="text-blue-700 mt-6">
                            All online payments on our website are processed securely via Razorpay.
                            Refund timelines may vary based on the payment method and bank policies.
                        </p>
                    </section>
                    <section>
                        <p className="text-blue-700 mt-4">
                            For any refund or order-related queries, please contact us at:
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

export default RefundPolicy;
