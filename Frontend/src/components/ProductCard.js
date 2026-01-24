import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, decrementItem, selectCartItems } from "../store/cartSlice";
import { Star } from "lucide-react";

const buildKey = (id, size) => `${id}-${size}`;

// Generate a consistent color based on product name
const getBackgroundColor = (name) => {
    const colors = [
        "bg-rose-500",
        "bg-amber-500",
        "bg-emerald-500",
        "bg-blue-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-teal-500",
        "bg-orange-500",
    ];
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
};

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const [imageError, setImageError] = useState(false);

    const sizes = useMemo(() => Array.isArray(product.sizes) ? product.sizes : [], [product.sizes]);
    const prices = useMemo(() => Array.isArray(product.prices) ? product.prices : [], [product.prices]);
    const defaultIndex = sizes.length > 1 ? 1 : 0;
    const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

    const selectedSize = sizes[selectedIndex] || sizes[0] || "";

    const isOrderable = sizes.length > 0 && prices.length >= sizes.length;

    const currentPrice = useMemo(() => {
        const priceByIndex = prices[selectedIndex];
        const priceByLabel = prices[selectedSize];
        const numeric = Number.isFinite(priceByIndex)
            ? Number(priceByIndex)
            : Number.isFinite(priceByLabel)
                ? Number(priceByLabel)
                : 0;
        return numeric;
    }, [prices, selectedIndex, selectedSize]);

    const productId = product.id || product._id;

    const displayPrice = isOrderable ? `₹${Math.round(currentPrice)}` : "Not available";

    const quantity = useMemo(() => {
        const key = buildKey(productId, selectedSize);
        const match = cartItems.find((item) => buildKey(item.id, item.size) === key);
        return match?.quantity || 0;
    }, [cartItems, productId, selectedSize]);

    const handleAdd = () => {
        dispatch(
            addItem({
                id: productId,
                name: product.name,
                price: currentPrice,
                size: selectedSize,
                image: product.image,
            })
        );
    };

    const handleDecrement = () => {
        dispatch(decrementItem({ id: productId, size: selectedSize }));
    };

    const bgColor = getBackgroundColor(product.name || "Product");

    // Generate consistent random rating between 4.0 and 5.0 based on product name
    const rating = useMemo(() => {
        const hash = (product.name || "").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const randomValue = (hash % 100) / 100; // 0 to 0.99
        return (4 + randomValue).toFixed(1);
    }, [product.name]);

    return (
        <div className="bg-white rounded-2xl shadow-soft p-4 flex flex-col gap-3 h-full">
            <div className="relative overflow-hidden rounded-xl">
                {!imageError && product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-44 w-full object-cover transform transition duration-300 hover:scale-105"
                        loading="lazy"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className={`h-44 w-full ${bgColor} flex items-center justify-center p-4`}>
                        <span className="text-white text-lg font-bold text-center leading-tight drop-shadow-md">
                            {product.name}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-slate-800 flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500" />
                    {rating}
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <div>
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                        <span className="text-sm font-semibold text-rose-600">{displayPrice}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1 overflow-hidden text-ellipsis" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                        {product.description}
                    </p>
                </div>

                {/* Only show size selector if there are multiple sizes or a non-empty single size */}
                {sizes.length > 1 || (sizes.length === 1 && sizes[0] !== "") ? (
                    <div className="flex gap-2 mt-auto">
                        {sizes.map((size, idx) => (
                            <button
                                key={`${size}-${idx}`}
                                onClick={() => setSelectedIndex(idx)}
                                className={`flex-1 rounded-full border px-3 py-2 text-xs font-semibold transition ${selectedIndex === idx
                                    ? "bg-rose-50 text-rose-700 border-rose-200"
                                    : "bg-white text-slate-600 border-slate-200"
                                    }`}
                                disabled={!isOrderable}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                ) : null}

                <div className="flex items-center gap-2">
                    {!isOrderable ? (
                        <span className="w-full text-center text-sm font-semibold text-slate-500 bg-slate-100 rounded-full py-3">
                            Currently unavailable
                        </span>
                    ) : quantity > 0 ? (
                        <div className="flex items-center w-full justify-between bg-slate-100 rounded-full px-3 py-2">
                            <button
                                onClick={handleDecrement}
                                className="h-8 w-8 flex items-center justify-center bg-white rounded-full text-slate-700 border border-slate-200"
                                aria-label="Decrease quantity"
                            >
                                -
                            </button>
                            <span className="text-sm font-semibold text-slate-800">{quantity} in cart</span>
                            <button
                                onClick={handleAdd}
                                className="h-8 w-8 flex items-center justify-center bg-rose-600 text-white rounded-full"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAdd}
                            className="w-full bg-rose-600 text-white rounded-full py-3 text-sm font-semibold shadow-md shadow-rose-200 hover:bg-rose-700 transition"
                            disabled={!isOrderable}
                        >
                            Add to cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
