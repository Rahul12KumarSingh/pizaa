import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../services/api";
import { fetchProductsFailure, fetchProductsRequest, fetchProductsSuccess } from "../productSlice";

function* handleFetchProducts() {
    try {
        const response = yield call(api.get, "/products/menu");
        const payload = response?.data?.data || response?.data || [];
        const normalized = Array.isArray(payload) ? payload : [];
        yield put(fetchProductsSuccess(normalized));
    } catch (error) {
        const message = error?.message || "Unable to load menu";
        yield put(fetchProductsFailure(message));
    }
}

export function* watchProducts() {
    yield takeLatest(fetchProductsRequest.type, handleFetchProducts);
}
