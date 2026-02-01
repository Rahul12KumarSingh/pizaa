import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import CartPage from "./pages/CartPage";
import AboutUsPage from "./pages/Aboutus";
import ContactUsPage from "./pages/Contactus";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Terms from "./pages/Terms";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  fetchProductsRequest,
  selectProducts,
  selectProductError,
  selectProductStatus,
} from "./store/productSlice";
import { ShieldCheck, Clock, MapPin, Sparkles } from "lucide-react";

const normalizeProduct = (product) => {
  // Handle variant-based products (Pizza, Fries, Shakes)
  if (product.variants && product.variants.length > 0) {
    return {
      id: product._id || product.id,
      name: product.title || product.name,
      description: product.description,
      image: product.image,
      prices: product.variants.map((v) => v.price),
      sizes: product.variants.map((v) => v.size),
      tags: product.tags || [],
    };
  }
  // Handle single-price products (Garlic Bread, Calzones)
  return {
    id: product._id || product.id,
    name: product.title || product.name,
    description: product.description,
    image: product.image,
    prices: product.price ? [product.price] : [],
    sizes: product.price ? [""] : [],
    tags: product.tags || [],
  };
};

const CATEGORY_ORDER = [
  "Pizza",
  "Santroni Special",
  "Garlic Bread",
  "Calzones",
  "Fries",
  "Shakes",
  "Beverage",
];

const HomeView = ({ menuData, status, error, onRetry, selectedCategory, onCategorySelect }) => {

  // Get all categories from menu data in fixed order
  const categories = useMemo(() => {
    if (!Array.isArray(menuData)) return [];
    const categoriesMap = menuData.map((cat) => ({
      id: cat.categoryId,
      name: cat.categoryName,
      slug: cat.categorySlug,
    }));

    // Sort categories according to the predefined order
    return categoriesMap.sort((a, b) => {
      const indexA = CATEGORY_ORDER.indexOf(a.name);
      const indexB = CATEGORY_ORDER.indexOf(b.name);

      // If both are in the order list, sort by their position
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      // If only one is in the order list, it comes first
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      // If neither are in the order list, keep original order
      return 0;
    });
  }, [menuData]);

  // Get products for selected category (or all products if none selected)
  const products = useMemo(() => {
    if (!Array.isArray(menuData)) return [];

    if (selectedCategory) {
      const category = menuData.find((cat) => cat.categoryId === selectedCategory);
      return category ? category.products.map(normalizeProduct) : [];
    }

    // Show all products when no category selected
    return menuData.flatMap((cat) => cat.products.map(normalizeProduct));
  }, [menuData, selectedCategory]);

  const selectedCategoryName = useMemo(() => {
    if (!selectedCategory) return "All Items";
    const category = categories.find((c) => c.id === selectedCategory);
    return category?.name || "All Items";
  }, [selectedCategory, categories]);

  // Sliding banner with animated text and color
  const bannerMessages = [
    { text: "Order local favorites in seconds", color: "bg-blue-600 text-white" },
    { text: "Fresh ingredients, fast delivery", color: "bg-green-600 text-white" },
    { text: "Secure payments, easy checkout", color: "bg-purple-600 text-white" },
    { text: "Hot deals every day!", color: "bg-pink-600 text-white" },
  ];
  const [bannerIndex, setBannerIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bannerMessages.length]);

  return (
    <div className="space-y-10 pb-12">
      <section className="relative bg-gradient-to-b from-blue-700 via-blue-600 to-blue-400 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-8">
          <div className="space-y-4">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-700 ease-in-out ${bannerMessages[bannerIndex].color}`}
              key={bannerIndex}
              style={{
                transform: 'translateX(0)',
                animation: 'slideX 0.7s cubic-bezier(0.4,0,0.2,1)'
              }}
            >
              <Sparkles className="h-4 w-4" />
              <span>{bannerMessages[bannerIndex].text}</span>
            </div>
            <style>{`
              @keyframes slideX {
                0% { transform: translateX(-100%); opacity: 0; }
                60% { opacity: 1; }
                100% { transform: translateX(0); opacity: 1; }
              }
            `}</style>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Hot, fresh, and local pizza delivered from your neighborhood shops.
            </h1>
          </div>
        </div>
        {/* Responsive SVG divider for all screens */}
        <div className="w-full overflow-hidden leading-none -mb-1">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8 sm:h-12">
            <path fill="#f8fafc" d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6" id="menu">
        {/* Redesigned: Menu Header & Category Tabs for Mobile-First UI */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
              <p className="text-lg sm:text-xl md:text-2xl font-extrabold uppercase tracking-wide text-blue-700 leading-tight mb-1 sm:mb-0">Menu</p>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 leading-tight text-left sm:text-right">{selectedCategoryName}</h2>
            </div>
            {/* Enhanced: Feature badges for better UX */}
            <div className="flex sm:hidden items-center gap-2 mt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full"><Clock className="h-4 w-4 text-blue-600" /> Fast prep</span>
              <span className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full"><ShieldCheck className="h-4 w-4 text-green-600" /> Secure pay</span>
              <span className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-full"><MapPin className="h-4 w-4 text-purple-600" /> Local shops</span>
            </div>
          </div>
          {/* Enhanced: Feature badges for better UX */}
          <div className="hidden sm:flex items-center gap-3 text-sm text-slate-600 flex-wrap">
            <span className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 px-4 py-2 rounded-xl shadow-sm font-semibold border border-blue-200">
              <Clock className="h-5 w-5 text-blue-500" />
              <span>Fast prep</span>
            </span>
            <span className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-green-50 text-green-700 px-4 py-2 rounded-xl shadow-sm font-semibold border border-green-200">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <span>Secure pay</span>
            </span>
            <span className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 px-4 py-2 rounded-xl shadow-sm font-semibold border border-purple-200">
              <MapPin className="h-5 w-5 text-purple-500" />
              <span>Local shops</span>
            </span>
          </div>
        </div>

        {/* Category Tabs - horizontal scroll, mobile friendly */}
        {status === "succeeded" && categories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide snap-x">
            <button
              onClick={() => onCategorySelect(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition snap-start ${!selectedCategory
                ? "bg-blue-600 text-white shadow"
                : "bg-white text-slate-600 border border-slate-200 hover:border-blue-200"
                }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition snap-start ${selectedCategory === category.id
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-blue-200"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {(status === "loading" || status === "idle") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 animate-pulse h-72 shadow-soft" />
            ))}
          </div>
        )}

        {status === "failed" && (
          <div className="bg-white border border-blue-100 text-blue-700 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">Could not load menu.</p>
              <p className="text-sm">{error}</p>
            </div>
            <button onClick={onRetry} className="px-3 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">
              Retry
            </button>
          </div>
        )}

        {status === "succeeded" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {status === "succeeded" && products.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p>No items found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const menuData = useSelector(selectProducts);
  const status = useSelector(selectProductStatus);
  const error = useSelector(selectProductError);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const homeElement = (
    <HomeView
      menuData={menuData}
      status={status}
      error={error}
      onRetry={() => dispatch(fetchProductsRequest())}
      selectedCategory={selectedCategory}
      onCategorySelect={setSelectedCategory}
    />
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={homeElement} />
          <Route path="/cart" element={<CartPage onNavigateHome={() => navigate("/")} />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
