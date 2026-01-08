import { createSlice } from "@reduxjs/toolkit";

const buildKey = (id, size) => `${id}-${size}`;

const initialState = {
    items: {},
    totalQuantity: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { id, name, price, size, image } = action.payload;
            const key = buildKey(id, size);
            const item = state.items[key] || {
                id,
                name,
                price,
                size,
                image,
                quantity: 0,
            };

            item.quantity += 1;
            state.items[key] = item;
            state.totalQuantity += 1;
            state.totalAmount += Number(price);
        },
        decrementItem: (state, action) => {
            const { id, size } = action.payload;
            const key = buildKey(id, size);
            const item = state.items[key];
            if (!item) return;

            item.quantity -= 1;
            state.totalQuantity -= 1;
            state.totalAmount -= Number(item.price);

            if (item.quantity <= 0) {
                delete state.items[key];
            }
        },
        removeItem: (state, action) => {
            const { id, size } = action.payload;
            const key = buildKey(id, size);
            const item = state.items[key];
            if (!item) return;

            state.totalQuantity -= item.quantity;
            state.totalAmount -= item.quantity * Number(item.price);
            delete state.items[key];
        },
        clearCart: (state) => {
            state.items = {};
            state.totalAmount = 0;
            state.totalQuantity = 0;
        },
    },
});

export const { addItem, decrementItem, removeItem, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => Object.values(state.cart.items);
export const selectCartCount = (state) => state.cart.totalQuantity;
export const selectCartTotal = (state) => state.cart.totalAmount;

export default cartSlice.reducer;
