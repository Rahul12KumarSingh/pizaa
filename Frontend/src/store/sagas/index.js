import { all, fork } from "redux-saga/effects";
import { watchProducts } from "./productSaga";

export default function* rootSaga() {
    yield all([fork(watchProducts)]);
}
