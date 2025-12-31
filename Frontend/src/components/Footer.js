import React from "react";
import { Pizza, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2">
              <Pizza className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold">PizzaSlice</span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm">
              Delivering happiness, one slice at a time. The best ingredients
              for the best pizza.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-gray-800 hover:bg-red-600"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-gray-800 hover:bg-red-600"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-gray-800 hover:bg-red-600"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-gray-800 hover:bg-red-600"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Our Menu
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Store Locator
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-wider uppercase">
                Support
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Allergen Info
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-wider uppercase">
                Newsletter
              </h3>
              <p className="mt-4 text-gray-400 text-sm">
                Get the latest deals and updates.
              </p>
              <form className="mt-4 flex">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 py-2 text-gray-800 rounded-l-md focus:outline-none"
                />
                <button className="bg-red-600 hover:bg-red-700 p-2 rounded-r-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 12h14"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} PizzaSlice Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
