import React from 'react';
import { Pizza, Tag, Store, ArrowRight, Leaf, Flame, UtensilsCrossed } from 'lucide-react';

const HomePage = () => {
  // --- Updated with local public/images paths ---
  const menuHighlights = [
    { 
      name: 'Margherita', 
      description: 'Classic cheese and tomato', 
      img: '/images/Margherita_Pizza.jpg', 
      icon: <UtensilsCrossed/> 
    },
    { 
      name: 'Paneer Tikka', 
      description: 'Loaded with spicy paneer', 
      img: '/images/paneer-tikka-pizza.jpg', 
      icon: <Flame/> 
    },
    {
    name: 'Chilli Paneer',
    description: 'A spicy Indo-Chinese fusion pizza',
    img: '/images/Chili_Paneer_Pizza.png',
    icon: <Flame />
   },
  ];

  const whyChooseUs = [
    { icon: <Pizza size={32}/>, title: 'Authentic Taste', description: 'Crafted with traditional recipes and the finest ingredients for an unforgettable flavor.' },
    { icon: <Tag size={32}/>, title: 'Amazing Deals', description: 'Enjoy value-packed deals and combos that make every meal a celebration.' },
    { icon: <Store size={32}/>, title: 'Fast & Fresh Delivery', description: 'Your pizza, delivered hot and fresh to your door, right when you expect it.' },
  ];

  return (
    <div className="bg-gray-50">
      <section className="relative bg-cover bg-center h-[75vh] min-h-[500px] text-white" style={{ backgroundImage: "url('https://source.unsplash.com/1920x1080/?pizza,dark')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-down">The Best Pizza in Town</h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl animate-fade-in-up">Hand-tossed crust, premium ingredients, and a passion for perfection. Ready in minutes, delivered to your door.</p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            Order Online Now <ArrowRight className="inline-block ml-2" />
          </button>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-gray-800">Why You'll Love PizzaSlice</h2>
             <p className="text-gray-600 mt-2">We're more than just a pizza place.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="bg-red-100 text-red-600 rounded-full p-4 mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-gray-800">Our Most Popular Pizzas</h2>
             <p className="text-gray-600 mt-2">Crafted with love and the finest ingredients.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuHighlights.map(pizza => (
              <div key={pizza.name} className="bg-white rounded-lg overflow-hidden shadow-lg group transition-shadow duration-300 hover:shadow-2xl">
                <div className="relative">
                  <img src={pizza.img} alt={pizza.name} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full">{pizza.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pizza.name}</h3>
                  <p className="text-gray-600 mb-4">{pizza.description}</p>
                  <a href="#" className="font-semibold text-red-600 hover:text-red-800 transition-colors">Order Now <ArrowRight size={16} className="inline"/></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;