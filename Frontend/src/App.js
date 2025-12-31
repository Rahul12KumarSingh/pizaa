import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import MenuPage from './pages/MenuPage'; // <-- Import new menu page

/* This component is no longer used, so we can remove it.
const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen container mx-auto px-4 py-16 text-center">
    <h1 className="text-4xl font-bold">{title}</h1>
    <p className="mt-4 text-gray-600">This is a placeholder page. Content will be added soon!</p>
  </div>
);
*/

export default function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // <-- Add cart state

  // --- Add to Cart Logic ---
  const handleAddToCart = (itemToAdd) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === itemToAdd.id);
      
      if (existingItem) {
        // Update quantity
        return prevCart.map(item => 
          item.id === itemToAdd.id 
            ? { ...item, quantity: item.quantity + itemToAdd.quantity } 
            : item
        );
      } else {
        // Add new item
        return [...prevCart, itemToAdd];
      }
    });
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage />;
      case 'signin':
        return <SignInPage setPage={setPage} setUser={setUser} />;
      case 'register':
        return <RegisterPage setPage={setPage} setUser={setUser} />;
      case 'menu':
        return <MenuPage onAddToCart={handleAddToCart} />; // <-- Pass handler
      case 'about':
        return <AboutUsPage />;
      case 'contact':
        return <ContactUsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="font-sans antialiased text-gray-800">
      <Header 
        setPage={setPage} 
        user={user} 
        setUser={setUser} 
        cart={cart} // <-- Pass cart to header
      />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}