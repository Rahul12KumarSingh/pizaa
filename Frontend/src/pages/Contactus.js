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
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-xl shadow-lg">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Contact Information
            </h2>
            <div className="flex items-start space-x-4">
              <div className="bg-red-100 text-red-600 p-3 rounded-full">
                <MapPin />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Our Address</h3>
                <p className="text-gray-600">
                  123 Pizza Street, Park Street Area, Kolkata, West Bengal
                  700016
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-red-100 text-red-600 p-3 rounded-full">
                <Phone />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Call Us</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-red-100 text-red-600 p-3 rounded-full">
                <Mail />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email Us</h3>
                <p className="text-gray-600">contact@pizzaslice.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Send a Message</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 transition-colors"
                >
                  {status.loading ? "Sending..." : "Send Message"}
                </button>
              </div>
              {status.error && (
                <p className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  {status.error}
                </p>
              )}
              {status.success && (
                <p className="mt-4 text-sm text-green-600 bg-green-50 p-3 rounded-md">
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
