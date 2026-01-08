import { createSlice } from "@reduxjs/toolkit";

const pizzaSlice = createSlice({
    name: "pizzas",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {
        fetchPizzasRequest: (state) => {
            state.status = "loading";
            state.error = null;
        },
        fetchPizzasSuccess: (state, action) => {
            state.status = "succeeded";
            state.items = action.payload;
        },
        fetchPizzasFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload || "Failed to fetch pizzas";
        },
    },
});

export const selectPizzas = (state) => state.pizzas.items;
export const selectPizzaStatus = (state) => state.pizzas.status;
export const selectPizzaError = (state) => state.pizzas.error;

export const { fetchPizzasRequest, fetchPizzasSuccess, fetchPizzasFailure } = pizzaSlice.actions;
export default pizzaSlice.reducer;
