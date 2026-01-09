import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, decrementItem, selectCartItems } from "../store/cartSlice";
import { Star } from "lucide-react";

const buildKey = (id, size) => `${id}-${size}`;

const PizzaCard = ({ pizza }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const sizes = Array.isArray(pizza.sizes) ? pizza.sizes : [];
    const prices = Array.isArray(pizza.prices) ? pizza.prices : [];
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

    const pizzaId = pizza.id || pizza._id;

    const displayPrice = isOrderable ? `₹${Math.round(currentPrice)}` : "Not available";

    const quantity = useMemo(() => {
        const key = buildKey(pizzaId, selectedSize);
        const match = cartItems.find((item) => buildKey(item.id, item.size) === key);
        return match?.quantity || 0;
    }, [cartItems, pizzaId, selectedSize]);

    const handleAdd = () => {
        dispatch(
            addItem({
                id: pizzaId,
                name: pizza.name,
                price: currentPrice,
                size: selectedSize,
                image: pizza.image,
            })
        );
    };

    const handleDecrement = () => {
        dispatch(decrementItem({ id: pizzaId, size: selectedSize }));
    };

    return (
        <div className="bg-white rounded-2xl shadow-soft p-4 flex flex-col gap-3 h-full">
            <div className="relative overflow-hidden rounded-xl">
                <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="h-44 w-full object-cover transform transition duration-300 hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-slate-800 flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500" />
                    4.8
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <div>
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-900">{pizza.name}</h3>
                        <span className="text-sm font-semibold text-rose-600">{displayPrice}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1 overflow-hidden text-ellipsis" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                        {pizza.description}
                    </p>
                </div>

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

export default PizzaCard;
