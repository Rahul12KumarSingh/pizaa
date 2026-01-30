import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ShoppingCart, Menu, X } from "lucide-react";
import { selectCartCount } from "../store/cartSlice";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-gradient-to-b from-blue-700 via-blue-600 to-blue-500/90 backdrop-blur shadow-sm sticky top-0 z-50 border-b border-blue-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center space-x-2 group"
            aria-label="Go to home"
          >
            <img src={process.env.PUBLIC_URL + "/logo.png"} alt="Santorini flavours logo" className="h-16 w-16 sm:h-24 sm:w-24 md:h-24 md:w-24 object-contain transition-transform duration-200 group-hover:scale-105 " />
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Santorini flavours
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-semibold transition relative pb-1 px-3 py-2 rounded-lg ${isActive
                    ? "text-white bg-blue-600 shadow"
                    : "text-blue-100 hover:bg-blue-500 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative p-2 rounded-full border border-slate-200 text-slate-700 hover:border-blue-200 hover:text-blue-700 transition"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

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
        <div className="md:hidden bg-gradient-to-b from-blue-700 via-blue-600 to-blue-400 border-t border-blue-200 shadow-sm">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block w-full text-left px-3 py-2 rounded-lg font-semibold transition-colors duration-200 ${isActive
                    ? "text-white bg-blue-600"
                    : "text-blue-100 hover:bg-blue-500 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
