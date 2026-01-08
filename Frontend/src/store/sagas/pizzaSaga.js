import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../services/api";
import { fetchPizzasFailure, fetchPizzasRequest, fetchPizzasSuccess } from "../pizzaSlice";

function* handleFetchPizzas() {
    try {
        const response = yield call(api.get, "/pizzas");
        const payload = response?.data?.data || response?.data || [];
        const normalized = Array.isArray(payload) ? payload : [];
        yield put(fetchPizzasSuccess(normalized));
    } catch (error) {
        const message = error?.message || "Unable to load pizzas";
        yield put(fetchPizzasFailure(message));
    }
}

export function* watchPizzas() {
    yield takeLatest(fetchPizzasRequest.type, handleFetchPizzas);
}
