import React from "react";
import { Leaf, Users, Timer } from "lucide-react";

const AboutUsPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-48 md:h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="aboutHeroGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <rect width="1440" height="320" fill="url(#aboutHeroGradient)" />
            <ellipse cx="720" cy="320" rx="800" ry="120" fill="#fff" fillOpacity="0.2" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center tracking-tight drop-shadow-lg animate-fade-in-down">
            About <span className="text-blue-200">Santorini flavours</span>
          </h1>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
              Our Story: A Passion for Perfection
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
              Santorini flavours was born from a simple idea in a small kitchen in
              Kinshangarh (Rajasthan): to create the most delicious pizza using only the
              freshest, locally-sourced ingredients. What started as a family's
              passion project quickly grew into a beloved local eatery, known
              for its authentic taste and commitment to quality.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              We believe pizza is more than just food; it's a way to bring
              people together. Every dough is hand-tossed with care, every sauce
              is made from our secret family recipe, and every topping is chosen
              for its quality and flavor.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative group w-full max-w-md">
              <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-br from-blue-200 via-indigo-200 to-emerald-100 rounded-[36px] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" aria-hidden="true" />
              <div className="relative rounded-[28px] p-1 bg-gradient-to-br from-blue-300 via-blue-100 to-white shadow-[0_25px_60px_rgba(15,23,42,0.15)]">
                <div className="rounded-[24px] overflow-hidden relative bg-slate-900/5">
                  <img
                    src="/images/shopImage.jpeg"
                    alt="Santorini flavours storefront"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 border border-white/30 rounded-[24px] pointer-events-none" />
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white px-5 py-2 rounded-full shadow-xl text-blue-700 font-semibold text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" aria-hidden="true" />
                  Locally Sourced
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-gradient-to-r from-blue-100 via-white to-blue-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center bg-white/80 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-blue-100 text-blue-600 rounded-full p-5 mb-4 shadow-md">
                <Leaf size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">
                Quality Ingredients
              </h3>
              <p className="text-gray-600 text-base">
                We partner with local farmers to bring you the freshest toppings
                and finest cheeses.
              </p>
            </div>
            <div className="flex flex-col items-center bg-white/80 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-blue-100 text-blue-600 rounded-full p-5 mb-4 shadow-md">
                <Users size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Community First</h3>
              <p className="text-gray-600 text-base">
                We're proud to be a part of the neighborhood and strive to make
                a positive impact.
              </p>
            </div>
            <div className="flex flex-col items-center bg-white/80 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-blue-100 text-blue-600 rounded-full p-5 mb-4 shadow-md">
                <Timer size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">
                Service with a Smile
              </h3>
              <p className="text-gray-600 text-base">
                From our kitchen to your seat, we're dedicated to providing a
                fast and friendly experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
