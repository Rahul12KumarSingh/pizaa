import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {
        fetchProductsRequest: (state) => {
            state.status = "loading";
            state.error = null;
        },
        fetchProductsSuccess: (state, action) => {
            state.status = "succeeded";
            state.items = action.payload;
        },
        fetchProductsFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload || "Failed to fetch products";
        },
    },
});

export const selectProducts = (state) => state.products.items;
export const selectProductStatus = (state) => state.products.status;
export const selectProductError = (state) => state.products.error;

export const { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure } = productSlice.actions;
export default productSlice.reducer;
