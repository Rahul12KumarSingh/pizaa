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

const HomeView = ({ menuData, status, error, onRetry, selectedCategory, onCategorySelect }) => {
  // Get all categories from menu data
  const categories = useMemo(() => {
    if (!Array.isArray(menuData)) return [];
    return menuData.map((cat) => ({
      id: cat.categoryId,
      name: cat.categoryName,
      slug: cat.categorySlug,
    }));
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

  return (
    <div className="space-y-10 pb-12">
      <section className="bg-gradient-to-b from-rose-600 via-rose-500 to-rose-400 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs font-semibold">
              <Sparkles className="h-4 w-4" />
              Order local favorites in seconds
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Hot, fresh, and local pizza delivered from your neighborhood shops.
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            {["30 min avg", "Live shop menus", "Secure payment"].map((item) => (
              <div key={item} className="bg-white/10 rounded-xl p-3 backdrop-blur">
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6" id="menu">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-rose-600 font-semibold">Menu</p>
            <h2 className="text-2xl font-bold text-slate-900">{selectedCategoryName}</h2>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600 flex-wrap">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-rose-600" /> Fast prep</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-rose-600" /> Secure pay</span>
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-rose-600" /> Local shops</span>
          </div>
        </div>

        {/* Category Tabs */}
        {status === "succeeded" && categories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
            <button
              onClick={() => onCategorySelect(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${!selectedCategory
                ? "bg-rose-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:border-rose-200"
                }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${selectedCategory === category.id
                  ? "bg-rose-600 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-rose-200"
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
          <div className="bg-white border border-rose-100 text-rose-700 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">Could not load menu.</p>
              <p className="text-sm">{error}</p>
            </div>
            <button onClick={onRetry} className="px-3 py-2 bg-rose-600 text-white rounded-full text-sm font-semibold">
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
