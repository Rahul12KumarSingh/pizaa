import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: "" });

    // Simulate API call
    setTimeout(() => {
      if (!formData.name || !formData.email || !formData.message) {
        setStatus({
          loading: false,
          error: "Please fill in all required fields.",
          success: "",
        });
      } else {
        console.log("Form Submitted:", formData);
        setStatus({
          loading: false,
          error: "",
          success:
            "Thank you for your message! We will get back to you shortly.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 tracking-tight drop-shadow-lg">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-blue-700">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/90 p-6 md:p-12 rounded-3xl shadow-2xl">
          {/* Contact Information */}
          <div className="space-y-10 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">Contact Information</h2>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full shadow-md">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-blue-900">Our Address</h3>
                <p className="text-blue-700">
                  Santorini Flavours, Shop No. 7, London Street, Moonland Bae, Snow Yard, Kinshangarh (Rajasthan) - 305801
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full shadow-md">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-blue-900">Call Us</h3>
                <p className="text-blue-700">+91 8905191233</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full shadow-md">
                <Mail size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-blue-900">Email Us</h3>
                <p className="text-blue-700">santoriniflavours@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">Send a Message</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-blue-900">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-blue-200 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-blue-50/60 text-blue-900 placeholder-blue-400"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-blue-900">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-blue-200 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-blue-50/60 text-blue-900 placeholder-blue-400"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="subject" className="text-sm font-medium text-blue-900">
                  Subject (optional)
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="mt-1 block w-full px-4 py-3 border border-blue-200 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-blue-50/60 text-blue-900 placeholder-blue-400"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject (optional)"
                />
              </div>
              <div className="mt-6">
                <label htmlFor="message" className="text-sm font-medium text-blue-900">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-blue-200 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-blue-50/60 text-blue-900 placeholder-blue-400 resize-none"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:bg-blue-300 transition-all duration-200"
                >
                  {status.loading ? "Sending..." : "Send Message"}
                </button>
              </div>
              {status.error && (
                <p className="mt-4 text-sm text-blue-700 bg-blue-100/80 p-3 rounded-md shadow">
                  {status.error}
                </p>
              )}
              {status.success && (
                <p className="mt-4 text-sm text-green-700 bg-green-100/80 p-3 rounded-md shadow">
                  {status.success}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
