import React, { useState } from "react";
import { Pizza, LogOut, ShoppingCart, Menu, X } from "lucide-react";

const Header = ({ setPage, user, setUser }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // In a real app, you would also clear the token from localStorage
    setUser(null);
    setPage("home");
    setIsMobileMenuOpen(false);
  };

  const navigate = (page) => {
    setPage(page);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", page: "home" },
    { name: "Our Menu", page: "menu" },
    { name: "About Us", page: "about" },
    { name: "Contact Us", page: "contact" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a
              href="#"
              onClick={() => navigate("home")}
              className="flex items-center space-x-2 group"
            >
              <Pizza
                className="h-8 w-8 text-red-600 group-hover:animate-spin"
                style={{ animationDuration: "2s" }}
              />
              <span className="text-2xl font-bold text-gray-800 tracking-tight">
                PizzaSlice
              </span>
            </a>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                onClick={() => navigate(link.page)}
                className="text-gray-600 font-medium hover:text-red-600 transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <>
                  <span className="text-gray-700 font-medium hidden lg:block">
                    Welcome, {user.name}!
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("signin")}
                    className="text-gray-600 font-medium hover:text-red-600 px-4 py-2 rounded-full transition-colors duration-300"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate("register")}
                    className="bg-red-600 text-white hover:bg-red-700 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-red-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
            </button>
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                onClick={() => navigate(link.page)}
                className="text-gray-600 hover:bg-red-50 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="px-5">
                <p className="text-base font-medium text-gray-800">
                  Welcome, {user.name}!
                </p>
                <button
                  onClick={handleLogout}
                  className="mt-3 w-full flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-2">
                <a
                  href="#"
                  onClick={() => navigate("register")}
                  className="block w-full text-center bg-red-600 text-white hover:bg-red-700 px-5 py-2 rounded-md text-base font-medium"
                >
                  Register
                </a>
                <a
                  href="#"
                  onClick={() => navigate("signin")}
                  className="block w-full text-center bg-gray-100 text-gray-700 hover:bg-gray-200 px-5 py-2 rounded-md text-base font-medium"
                >
                  Sign In
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
