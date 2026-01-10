import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PizzaCard from "./components/PizzaCard";
import CartPage from "./pages/CartPage";
import AboutUsPage from "./pages/Aboutus";
import ContactUsPage from "./pages/Contactus";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Terms from "./pages/Terms";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  fetchPizzasRequest,
  selectPizzas,
  selectPizzaError,
  selectPizzaStatus,
} from "./store/pizzaSlice";
import { ShieldCheck, Clock, MapPin, Sparkles } from "lucide-react";

const normalizePizza = (pizza) => {
  return {
    id: pizza._id || pizza.id,
    name: pizza.title || pizza.name,
    description:
      pizza.description,
    image: pizza.image,
    prices: Array.isArray(pizza.prices) ? pizza.prices : [],
    sizes: Array.isArray(pizza.sizes) ? pizza.sizes : [],
  };
};

const HomeView = ({ pizzas, status, error, onRetry, onOpenCart }) => (
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
          {[
            "30 min avg",
            "Live shop menus",
            "Secure payment",
          ].map((item) => (
            <div key={item} className="bg-white/10 rounded-xl p-3 backdrop-blur">
              <p className="font-semibold">{item}</p>
              {/* <p className="text-white/70 text-xs">Reliable, mobile-first experience.</p> */}
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-4 sm:px-6" id="menu">

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">

        <div>
          <p className="text-xs uppercase tracking-wide text-rose-600 font-semibold">Menu</p>
          <h2 className="text-2xl font-bold text-slate-900">Popular choices</h2>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600 flex-wrap">
          <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-rose-600" /> Fast prep</span>
          <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-rose-600" /> Secure pay</span>
          <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-rose-600" /> Local shops</span>
        </div>

      </div>

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
            <p className="font-semibold">Could not load pizzas.</p>
            <p className="text-sm">{error}</p>
          </div>
          <button onClick={onRetry} className="px-3 py-2 bg-rose-600 text-white rounded-full text-sm font-semibold">
            Retry
          </button>
        </div>
      )}

      {status === "succeeded" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pizzas.map((pizza) => (
            <PizzaCard key={pizza.id || pizza._id} pizza={pizza} />
          ))}
        </div>
      )}
    </section>
  </div>
);

const App = () => {
  const dispatch = useDispatch();
  const pizzas = useSelector(selectPizzas);
  const status = useSelector(selectPizzaStatus);
  const error = useSelector(selectPizzaError);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPizzasRequest());
  }, [dispatch]);

  const normalizedPizzas = useMemo(() => pizzas.map((p) => normalizePizza(p)), [pizzas]);

  const homeElement = (
    <HomeView
      pizzas={normalizedPizzas}
      status={status}
      error={error}
      onRetry={() => dispatch(fetchPizzasRequest())}
      onOpenCart={() => navigate("/cart")}
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
