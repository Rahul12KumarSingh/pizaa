import { all, fork } from "redux-saga/effects";
import { watchPizzas } from "./pizzaSaga";

export default function* rootSaga() {
    yield all([fork(watchPizzas)]);
}
