import React from "react";
import { Leaf, Users, Timer } from "lucide-react";

const AboutUsPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-800">
        {/* <img
          src="https://placehold.co/1920x800/f87171/ffffff"
          alt="Our Pizzeria"
          className="w-full h-full object-cover opacity-40"
        /> */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white text-center tracking-tight animate-fade-in-down">
            About Santorini flavours
          </h1>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Story: A Passion for Perfection
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Santorini flavours was born from a simple idea in a small kitchen in
              Kinshangarh(Rajasthan): to create the most delicious pizza using only the
              freshest, locally-sourced ingredients. What started as a family's
              passion project quickly grew into a beloved local eatery, known
              for its authentic taste and commitment to quality.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe pizza is more than just food; it's a way to bring
              people together. Every dough is hand-tossed with care, every sauce
              is made from our secret family recipe, and every topping is chosen
              for its quality and flavor.
            </p>
          </div>
          <div>
            <img
              src="https://placehold.co/600x400/34d399/ffffff?text=Fresh+Ingredients"
              alt="Fresh Ingredients"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center">
              <div className="bg-red-100 text-red-600 rounded-full p-5 mb-4">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Quality Ingredients
              </h3>
              <p className="text-gray-600">
                We partner with local farmers to bring you the freshest toppings
                and finest cheeses.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-red-100 text-red-600 rounded-full p-5 mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community First</h3>
              <p className="text-gray-600">
                We're proud to be a part of the neighborhood and strive to make
                a positive impact.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-red-100 text-red-600 rounded-full p-5 mb-4">
                <Timer size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Service with a Smile
              </h3>
              <p className="text-gray-600">
                From our kitchen to your Seat, we're dedicated to providing a
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
