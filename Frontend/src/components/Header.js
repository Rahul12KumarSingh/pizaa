import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Pizza, ShoppingCart, Menu, X } from "lucide-react";
import { selectCartCount } from "../store/cartSlice";

const Header = ({ onNavigate, activeView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);

  const navLinks = [
    { name: "Home", page: "home" },
    { name: "Cart", page: "cart" },
    { name: "About", page: "about" },
    { name: "Contact", page: "contact" },
  ];

  const handleNavigate = (page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/90 backdrop-blur shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => handleNavigate("home")}
            className="flex items-center space-x-2 group"
            aria-label="Go to home"
          >
            <Pizza className="h-8 w-8 text-rose-600 group-hover:rotate-12 transition" />
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              SliceLocal
            </span>
          </button>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavigate(link.page)}
                className={`text-sm font-semibold transition relative pb-1 ${activeView === link.page
                    ? "text-rose-600"
                    : "text-slate-600 hover:text-rose-600"
                  }`}
              >
                {link.name}
                {activeView === link.page && (
                  <span className="absolute left-0 bottom-0 h-0.5 w-full bg-rose-600 rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavigate("cart")}
              className="relative p-2 rounded-full border border-slate-200 text-slate-700 hover:border-rose-200 hover:text-rose-700 transition"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-slate-700 hover:bg-slate-100"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-sm">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavigate(link.page)}
                className={`block w-full text-left px-3 py-2 rounded-lg font-semibold ${activeView === link.page
                    ? "text-rose-700 bg-rose-50"
                    : "text-slate-700 hover:bg-slate-50"
                  }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
