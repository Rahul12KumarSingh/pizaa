// import React, { useState } from 'react';
// import { ShoppingCart, Leaf, Flame, Plus, X } from 'lucide-react';

// // --- Updated Pizza Data with REAL Images ---
// const pizzas = [
//   { name: 'Margherita Pizza', prices: { small: 149, medium: 229, large: 299 }, desc: 'Classic delight with 100% real mozzarella cheese.', ingredients: 'Our classic marinara sauce, fresh mozzarella cheese, and a sprinkle of basil on a hand-tossed crust.', img: 'https://source.unsplash.com/600x400/?margherita+pizza', icon: <Leaf/> },
//   { name: 'OTC Pizza', prices: { small: 179, medium: 269, large: 349 }, desc: 'Onion, Tomato, Capsicum. A veggie classic.', ingredients: 'A vegetarian delight! Diced onions, ripe tomatoes, and crunchy capsicum with mozzarella cheese.', img: 'https://source.unsplash.com/600x400/?vegetarian+pizza', icon: <Leaf/> },
//   { name: 'Potato Crunchy Pizza', prices: { small: 179, medium: 269, large: 349 }, desc: 'Crispy potato bits for a crunchy surprise.', ingredients: 'A unique combination of spicy potato bits, crispy fried onions, and a tangy sauce.', img: 'https://source.unsplash.com/600x400/?potato+pizza', icon: <Flame/> },
//   { name: 'Corn Pizza', prices: { small: 179, medium: 269, large: 349 }, desc: 'Sweet corn and gooey cheese, a simple pleasure.', ingredients: 'Sweet, juicy golden corn kernels and 100% mozzarella cheese. Simple and delicious.', img: 'https://source.unsplash.com/600x400/?corn+pizza', icon: <Leaf/> },
//   { name: 'Mushroom Pizza', prices: { small: 179, medium: 269, large: 349 }, desc: 'Loaded with fresh, earthy mushrooms.', ingredients: 'Generously topped with fresh, earthy button mushrooms and melted mozzarella cheese.', img: 'https://source.unsplash.com/600x400/?mushroom+pizza', icon: <Leaf/> },
//   { name: 'Jain Special Pizza', prices: { small: 199, medium: 299, large: 379 }, desc: 'Specially prepared with Jain-friendly ingredients.', ingredients: 'Specially prepared without onion or garlic. Features tomato, capsicum, and sweet corn.', img: 'https://source.unsplash.com/600x400/?veggie+pizza', icon: <Leaf/> },
//   { name: 'Farm House Pizza', prices: { small: 219, medium: 329, large: 419 }, desc: 'Onion, capsicum, mushroom, and tomato.', ingredients: 'A garden-fresh pizza with diced onion, capsicum, mushroom, and ripe tomatoes.', img: 'https://source.unsplash.com/600x400/?farmhouse+pizza', icon: <Leaf/> },
//   { name: 'Corn Mushroom Pizza', prices: { small: 199, medium: 299, large: 379 }, desc: 'A delicious combo of sweet corn and mushroom.', ingredients: 'The perfect pairing of sweet golden corn and fresh button mushrooms.', img: 'https://source.unsplash.com/600x400/?corn+mushroom+pizza', icon: <Leaf/> },
//   { name: 'Paneer Tikka Pizza', prices: { small: 219, medium: 329, large: 419 }, desc: 'Spicy paneer tikka, onion, and capsicum.', ingredients: 'Spicy marinated paneer tikka, sliced onions, and fresh capsicum on a zesty sauce base.', img: 'https://source.unsplash.com/600x400/?paneer+pizza', icon: <Flame/> },
//   { name: 'Exotica Pizza', prices: { small: 219, medium: 329, large: 419 }, desc: 'Red & yellow bell peppers, jalapenos, and olives.', ingredients: 'A taste of the exotic with red & yellow bell peppers, spicy jalapenos, and black olives.', img: 'https://source.unsplash.com/600x400/?exotic+vegetable+pizza', icon: <Leaf/> },
//   { name: 'Peri Peri Veg Pizza', prices: { small: 219, medium: 329, large: 419 }, desc: 'Spicy peri peri veggies for a fiery taste.', ingredients: 'A fiery mix of spicy peri peri sauce, corn, capsicum, onion, and mozzarella cheese.', img: 'https://source.unsplash.com/600x400/?spicy+veg+pizza', icon: <Flame/> },
//   { name: 'Double Cheese Pizza', prices: { small: 219, medium: 329, large: 419 }, desc: 'Loaded with extra mozzarella cheese.', ingredients: 'For the cheese lovers! A sinful load of extra 100% mozzarella cheese.', img: 'https://source.unsplash.com/600x400/?cheese+pizza', icon: <Leaf/> },
//   { name: 'Peri Peri Paneer Pizza', prices: { small: 250, medium: 370, large: 480 }, desc: 'The perfect blend of spicy peri peri and soft paneer.', ingredients: 'Spicy peri peri marinated paneer cubes, red paprika, and crunchy capsicum.', img: 'https://source.unsplash.com/600x400/?spicy+paneer+pizza', icon: <Flame/> },
//   { name: 'Barbeque Paneer Pizza', prices: { small: 250, medium: 370, large: 480 }, desc: 'Smoky barbeque paneer and crispy capsicum.', ingredients: 'Smoky barbeque paneer, crispy capsicum, and onions, drizzled with BBQ sauce.', img: 'https://source.unsplash.com/600x400/?barbeque+pizza', icon: <Flame/> },
//   { name: 'English Farm Pizza', prices: { small: 250, medium: 370, large: 480 }, desc: 'A sophisticated blend of exotic veggies.', ingredients: 'A classy pizza with black olives, jalapenos, mushrooms, and bell peppers.', img: 'https://source.unsplash.com/600x400/?vegetable+pizza', icon: <Leaf/> },
//   { name: 'Chilli Paneer Pizza', prices: { small: 270, medium: 400, large: 540 }, desc: 'An indo-chinese fusion with chilli paneer.', ingredients: 'An epic fusion of spicy chilli paneer, spring onions, and capsicum.', img: 'https://source.unsplash.com/600x400/?chilli+paneer+pizza', icon: <Flame/> },
//   { name: 'Santorini Special', prices: { medium: 450, large: 600 }, desc: 'Our chef\'s special, loaded with all toppings.', ingredients: 'The ultimate pizza experience! Loaded with paneer tikka, mushroom, olives, jalapenos, and all our veggie toppings.', img: 'https://source.unsplash.com/600x400/?loaded+pizza', icon: <Flame/> },
// ];

// const garlicBreads = [
//   { name: 'Garlic Bread', price: 99, img: 'https://source.unsplash.com/600x400/?garlic+bread' },
//   { name: 'Cheese Garlic Bread', price: 149, img: 'https://source.unsplash.com/600x400/?cheese+garlic+bread' },
//   { name: 'Paneer Stuffed Garlic Bread', price: 169, img: 'https://source.unsplash.com/600x400/?stuffed+garlic+bread' },
// ];

// const toppings = [
//   { name: 'Jalapeno', prices: { small: 40, medium: 60, large: 80 } },
//   { name: 'Olive', prices: { small: 40, medium: 60, large: 80 } },
//   { name: 'Cheese', prices: { small: 40, medium: 60, large: 80 } },
//   { name: 'Mayonnaise', prices: { small: 40, medium: 60, large: 80 } },
// ];

// // --- New Pizza Modal Component ---
// const PizzaModal = ({ pizza, onClose, onAddToCart }) => {
//   const [selectedSize, setSelectedSize] = useState(pizza.prices.medium ? 'medium' : Object.keys(pizza.prices)[0]);
//   const [quantity, setQuantity] = useState(1);

//   const getPrice = () => {
//     return pizza.prices[selectedSize] * quantity;
//   };

//   const getSizes = () => {
//     return Object.keys(pizza.prices);
//   };

//   const handleAddToCart = () => {
//     const item = {
//       id: `${pizza.name}-${selectedSize}`,
//       name: pizza.name,
//       size: selectedSize,
//       quantity: quantity,
//       price: pizza.prices[selectedSize],
//       img: pizza.img
//     };
//     onAddToCart(item);
//     onClose(); // Close modal after adding
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 modal-backdrop">
//       <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row modal-content">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
//           <X size={28} />
//         </button>
        
//         {/* Image Section */}
//         <div className="w-full md:w-1/2">
//           <img src={pizza.img} alt={pizza.name} className="w-full h-64 md:h-full object-cover" />
//         </div>
        
//         {/* Content Section */}
//         <div className="w-full md:w-1/2 p-8 overflow-y-auto">
//           <span className="inline-block bg-red-100 text-red-600 p-2 rounded-full mb-4">{pizza.icon}</span>
//           <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{pizza.name}</h2>
          
//           <h3 className="text-md font-semibold text-gray-700 mb-2">Ingredients:</h3>
//           <p className="text-gray-600 text-sm mb-6">{pizza.ingredients}</p>
          
//           {/* Size Selection */}
//           <div className="mb-6">
//             <h3 className="text-md font-semibold text-gray-700 mb-3">Select Size:</h3>
//             <div className="flex gap-2 flex-wrap">
//               {getSizes().map(size => (
//                 <button 
//                   key={size} 
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSize === size ? 'bg-red-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//                 >
//                   {size.charAt(0).toUpperCase() + size.slice(1)} - ₹{pizza.prices[size]}
//                 </button>
//               ))}
//             </div>
//           </div>
          
//           {/* Quantity Selection */}
//           <div className="mb-8">
//              <h3 className="text-md font-semibold text-gray-700 mb-3">Quantity:</h3>
//              <div className="flex items-center">
//                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full font-bold text-lg">-</button>
//                <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
//                <button onClick={() => setQuantity(q => q + 1)} className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full font-bold text-lg">+</button>
//              </div>
//           </div>

//           {/* Add to Cart Button */}
//           <button 
//             onClick={handleAddToCart}
//             className="w-full flex items-center justify-center bg-yellow-400 text-yellow-900 hover:bg-yellow-500 font-bold px-6 py-4 rounded-full text-lg transition-all duration-300"
//           >
//             <ShoppingCart size={20} className="mr-2" />
//             Add to Cart (₹{getPrice()})
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// // --- Updated Pizza Card Component ---
// const PizzaCard = ({ pizza, onClick }) => {
//   return (
//     <div 
//       onClick={onClick}
//       className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 cursor-pointer" 
//       style={{ animation: 'fadeIn 0.5s ease-out forwards' }}
//     >
//       <div className="relative">
//         <img src={pizza.img} alt={pizza.name} className="w-full h-56 object-cover" />
//         <span className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full shadow-md">{pizza.icon}</span>
//       </div>
//       <div className="p-5">
//         <h3 className="text-xl font-bold text-gray-800 mb-2">{pizza.name}</h3>
//         <p className="text-gray-600 text-sm mb-4 h-10">{pizza.desc}</p>
//         <div className="flex items-center justify-between">
//           <span className="text-xl font-extrabold text-gray-900">
//             From ₹{Math.min(...Object.values(pizza.prices))}
//           </span>
//           <button className="flex items-center bg-yellow-400 text-yellow-900 hover:bg-yellow-500 font-bold px-4 py-2 rounded-full text-sm transition-all duration-300">
//             <Plus size={16} className="mr-1" /> View
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Updated Menu Page Component ---
// const MenuPage = ({ onAddToCart }) => {
//   const [selectedPizza, setSelectedPizza] = useState(null);

//   return (
//     <div className="bg-gray-100">
//       {/* Hero Section */}
//       <div className="relative h-96 bg-gray-800">
//         <img src="https://source.unsplash.com/1920x800/?pizza,menu" alt="Our Menu" className="w-full h-full object-cover opacity-40"/>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <h1 className="text-5xl md:text-7xl font-extrabold text-white text-center tracking-tight animate-fade-in-down">Explore Our Menu</h1>
//         </div>
//       </div>

//       {/* Pizza Section */}
//       <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Our Signature Pizzas</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {pizzas.map((pizza, index) => (
//             <PizzaCard key={index} pizza={pizza} onClick={() => setSelectedPizza(pizza)} />
//           ))}
//         </div>
//       </section>

//       {/* Sides & Extras Section */}
//       <section className="bg-white py-20">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Sides & Extras</h2>
          
//           <h3 className="text-2xl font-bold text-gray-800 mb-6">Garlic Breads</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//             {garlicBreads.map((item, index) => (
//               <div key={index} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden flex transition-all duration-300 ease-in-out hover:shadow-lg">
//                 <img src={item.img} alt={item.name} className="w-1/3 object-cover"/>
//                 <div className="p-4 flex flex-col justify-between">
//                   <div>
//                     <h4 className="font-bold text-lg text-gray-800">{item.name}</h4>
//                     <span className="text-lg font-extrabold text-gray-900">₹{item.price}</span>
//                   </div>
//                   <button className="mt-2 text-sm font-semibold text-red-600 hover:text-red-800 self-start">Add +</button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <h3 className="text-2xl font-bold text-gray-800 mb-6">Extra Toppings</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {toppings.map((item, index) => (
//               <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm text-center">
//                 <h4 className="font-bold text-gray-800">{item.name}</h4>
//                 <p className="text-sm text-gray-600">
//                   S: ₹{item.prices.small} | M: ₹{item.prices.medium} | L: ₹{item.prices.large}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
      
//       {/* --- Render Modal --- */}
//       {selectedPizza && (
//         <PizzaModal 
//           pizza={selectedPizza} 
//           onClose={() => setSelectedPizza(null)} 
//           onAddToCart={onAddToCart}
//         />
//       )}
//     </div>
//   );
// };

// export default MenuPage;

import React, { useState } from 'react';
import { ShoppingCart, Leaf, Flame, Plus, X } from 'lucide-react';

// --- Local public image paths (public/images) ---
const pizzas = [
  { name: 'Margherita Pizza', prices: { small: 149, medium: 229, large: 299 }, desc: 'Classic delight with 100% real mozzarella cheese.', ingredients: 'Our classic marinara sauce, fresh mozzarella cheese, and a sprinkle of basil on a hand-tossed crust.', img: '/images/Margherita_Pizza.jpg', icon: <Leaf/> },
  { name: 'OTC Pizza', prices: { small: 179, medium: 269, large: 349 }, desc: 'Onion, Tomato, Capsicum. A veggie classic.', ingredients: 'A vegetarian delight! Diced onions, ripe tomatoes, and crunchy capsicum with mozzarella cheese.', img: '/images/OTC_Pizza.webp', icon: <Leaf/> },
  { name: 'Potato Crunchy Pizza', prices: { small: 179, medium: 269, large: 349 }, desc: 'Crispy potato bits for a crunchy surprise.', ingredients: 'A unique combination of spicy potato bits, crispy fried onions, and a tangy sauce.', img: '/images/Cruncy_Pizza.png', icon: <Flame/> },
  { name: 'Corn Pizza', prices: { small: 179, medium: 269, large: 349 }, desc: 'Sweet corn and gooey cheese, a simple pleasure.', ingredients: 'Sweet, juicy golden corn kernels and 100% mozzarella cheese. Simple and delicious.', img: '/images/Corn_Pizza.avif', icon: <Leaf/> },
  { name: 'Mushroom Pizza', prices: { small: 179, medium: 269, large: 349 }, desc: 'Loaded with fresh, earthy mushrooms.', ingredients: 'Generously topped with fresh, earthy button mushrooms and melted mozzarella cheese.', img: '/images/Mushroom_Pizza.jpg', icon: <Leaf/> },
  { name: 'Jain Special Pizza', prices: { small: 199, medium: 299, large: 379 }, desc: 'Specially prepared with Jain-friendly ingredients.', ingredients: 'Specially prepared without onion or garlic. Features tomato, capsicum, and sweet corn.', img: '/images/Jain_Pizza.jpg', icon: <Leaf/> },
  { name: 'Farm House Pizza', prices: { small: 219, medium: 329, large: 419 }, desc: 'Onion, capsicum, mushroom, and tomato.', ingredients: 'A garden-fresh pizza with diced onion, capsicum, mushroom, and ripe tomatoes.', img: '/images/FarmHouse_Pizza.jpeg', icon: <Leaf/> },
  { name: 'Corn Mushroom Pizza', prices: { small: 199, medium: 299, large: 379 }, desc: 'A delicious combo of sweet corn and mushroom.', ingredients: 'The perfect pairing of sweet golden corn and fresh button mushrooms.', img: '/images/Corn_Mushroom_Pizza.jpeg', icon: <Leaf/> },
  { name: 'Paneer Tikka Pizza', prices: { small: 219, medium: 329, large: 419 }, desc: 'Spicy paneer tikka, onion, and capsicum.', ingredients: 'Spicy marinated paneer tikka, sliced onions, and fresh capsicum on a zesty sauce base.', img: '/images/paneer-tikka-pizza.jpg', icon: <Flame/> },
  { name: 'Exotica Pizza', prices: { small: 219, medium: 329, large: 419 }, desc: 'Red & yellow bell peppers, jalapenos, and olives.', ingredients: 'A taste of the exotic with red & yellow bell peppers, spicy jalapenos, and black olives.', img: '/images/Exotica_Pizza.png', icon: <Leaf/> },
  { name: 'Peri Peri Veg Pizza', prices: { small: 219, medium: 329, large: 419 }, desc: 'Spicy peri peri veggies for a fiery taste.', ingredients: 'A fiery mix of spicy peri peri sauce, corn, capsicum, onion, and mozzarella cheese.', img: '/images/Peri-Peri_Veg_Pizza.png', icon: <Flame/> },
  { name: 'Double Cheese Pizza', prices: { small: 219, medium: 329, large: 419 }, desc: 'Loaded with extra mozzarella cheese.', ingredients: 'For the cheese lovers! A sinful load of extra 100% mozzarella cheese.', img: '/images/Double_Cheese_pizza.png', icon: <Leaf/> },
  { name: 'Peri Peri Paneer Pizza', prices: { small: 250, medium: 370, large: 480 }, desc: 'The perfect blend of spicy peri peri and soft paneer.', ingredients: 'Spicy peri peri marinated paneer cubes, red paprika, and crunchy capsicum.', img: '/images/Peri-Peri_Paneer_Pizza.png', icon: <Flame/> },
  { name: 'Barbeque Paneer Pizza', prices: { small: 250, medium: 370, large: 480 }, desc: 'Smoky barbeque paneer and crispy capsicum.', ingredients: 'Smoky barbeque paneer, crispy capsicum, and onions, drizzled with BBQ sauce.', img: '/images/BBQ_Pizza.png', icon: <Flame/> },
  { name: 'English Farm Pizza', prices: { small: 250, medium: 370, large: 480 }, desc: 'A sophisticated blend of exotic veggies.', ingredients: 'A classy pizza with black olives, jalapenos, mushrooms, and bell peppers.', img: '/images/English_Farm_Pizza.png', icon: <Leaf/> },
  { name: 'Chilli Paneer Pizza', prices: { small: 270, medium: 400, large: 540 }, desc: 'An indo-chinese fusion with chilli paneer.', ingredients: 'An epic fusion of spicy chilli paneer, spring onions, and capsicum.', img: '/images/Chili_Paneer_Pizza.png', icon: <Flame/> },
  { name: 'Santorini Special', prices: { medium: 450, large: 600 }, desc: 'Our chef\'s special, loaded with all toppings.', ingredients: 'The ultimate pizza experience! Loaded with paneer tikka, mushroom, olives, jalapenos, and all our veggie toppings.', img: '/images/Santorini_Pizza.png', icon: <Flame/> },
];

const garlicBreads = [
  { name: 'Garlic Bread', price: 99, img: '/images/Garlic_Bread.png' },
  { name: 'Cheese Garlic Bread', price: 149, img: '/images/Garlic_Cheese_Bread.png' },
  { name: 'Paneer Stuffed Garlic Bread', price: 169, img: '/images/Cheesy_Stuffed_Garlic_Bread.png' },
];

const toppings = [
  { name: 'Jalapeno', prices: { small: 40, medium: 60, large: 80 } },
  { name: 'Olive', prices: { small: 40, medium: 60, large: 80 } },
  { name: 'Cheese', prices: { small: 40, medium: 60, large: 80 } },
  { name: 'Mayonnaise', prices: { small: 40, medium: 60, large: 80 } },
];

// --- PizzaModal Component ---
const PizzaModal = ({ pizza, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(pizza.prices.medium ? 'medium' : Object.keys(pizza.prices)[0]);
  const [quantity, setQuantity] = useState(1);

  const getPrice = () => pizza.prices[selectedSize] * quantity;
  const getSizes = () => Object.keys(pizza.prices);

  const handleAddToCart = () => {
    const item = {
      id: `${pizza.name}-${selectedSize}`,
      name: pizza.name,
      size: selectedSize,
      quantity,
      price: pizza.prices[selectedSize],
      img: pizza.img
    };
    onAddToCart(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row modal-content">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
          <X size={28} />
        </button>

        <div className="w-full md:w-1/2">
          <img src={pizza.img} alt={pizza.name} className="w-full h-64 md:h-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-8 overflow-y-auto">
          <span className="inline-block bg-red-100 text-red-600 p-2 rounded-full mb-4">{pizza.icon}</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{pizza.name}</h2>

          <h3 className="text-md font-semibold text-gray-700 mb-2">Ingredients:</h3>
          <p className="text-gray-600 text-sm mb-6">{pizza.ingredients}</p>

          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-700 mb-3">Select Size:</h3>
            <div className="flex gap-2 flex-wrap">
              {getSizes().map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSize === size ? 'bg-red-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)} - ₹{pizza.prices[size]}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-md font-semibold text-gray-700 mb-3">Quantity:</h3>
            <div className="flex items-center">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full font-bold text-lg">-</button>
              <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full font-bold text-lg">+</button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center bg-yellow-400 text-yellow-900 hover:bg-yellow-500 font-bold px-6 py-4 rounded-full text-lg transition-all duration-300"
          >
            <ShoppingCart size={20} className="mr-2" />
            Add to Cart (₹{getPrice()})
          </button>
        </div>
      </div>
    </div>
  );
};

// --- PizzaCard Component ---
const PizzaCard = ({ pizza, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
    style={{ animation: 'fadeIn 0.5s ease-out forwards' }}
  >
    <div className="relative">
      <img src={pizza.img} alt={pizza.name} className="w-full h-56 object-cover" />
      <span className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full shadow-md">{pizza.icon}</span>
    </div>
    <div className="p-5">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{pizza.name}</h3>
      <p className="text-gray-600 text-sm mb-4 h-10">{pizza.desc}</p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-extrabold text-gray-900">
          From ₹{Math.min(...Object.values(pizza.prices))}
        </span>
        <button className="flex items-center bg-yellow-400 text-yellow-900 hover:bg-yellow-500 font-bold px-4 py-2 rounded-full text-sm transition-all duration-300">
          <Plus size={16} className="mr-1" /> View
        </button>
      </div>
    </div>
  </div>
);

// --- MenuPage Component ---
const MenuPage = ({ onAddToCart }) => {
  const [selectedPizza, setSelectedPizza] = useState(null);

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-800">
        <img src="/images/Margherita_Pizza.jpg" alt="Our Menu" className="w-full h-full object-cover opacity-40"/>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white text-center tracking-tight animate-fade-in-down">Explore Our Menu</h1>
        </div>
      </div>

      {/* Pizza Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Our Signature Pizzas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pizzas.map((pizza, index) => (
            <PizzaCard key={index} pizza={pizza} onClick={() => setSelectedPizza(pizza)} />
          ))}
        </div>
      </section>

      {/* Sides & Extras Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Sides & Extras</h2>

          <h3 className="text-2xl font-bold text-gray-800 mb-6">Garlic Breads</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {garlicBreads.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden flex transition-all duration-300 ease-in-out hover:shadow-lg">
                <img src={item.img} alt={item.name} className="w-1/3 object-cover"/>
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{item.name}</h4>
                    <span className="text-lg font-extrabold text-gray-900">₹{item.price}</span>
                  </div>
                  <button className="mt-2 text-sm font-semibold text-red-600 hover:text-red-800 self-start">Add +</button>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-6">Extra Toppings</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {toppings.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm text-center">
                <h4 className="font-bold text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-600">
                  S: ₹{item.prices.small} | M: ₹{item.prices.medium} | L: ₹{item.prices.large}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Render Modal --- */}
      {selectedPizza && (
        <PizzaModal
          pizza={selectedPizza}
          onClose={() => setSelectedPizza(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
};

export default MenuPage;
