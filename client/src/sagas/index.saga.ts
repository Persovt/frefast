import {
  AuthfetchServerAsync,
  RegfetchServerAsync,
  ValidateTokenfetchServerAsync,
} from "./auth.saga";
import {
  AddNewProduct,
  LoadProduct,
  DeleteProduct,
  RedactProduct,
} from "./store.saga";
import { takeEvery } from "redux-saga/effects";

function* watchFetchDog() {
  yield takeEvery("AUTH_FETCHED_SERVER", AuthfetchServerAsync);
  yield takeEvery("REG_FETCHED_SERVER", RegfetchServerAsync);
  yield takeEvery(
    "VALIDATE_TOKEN_FETCHED_SERVER",
    ValidateTokenfetchServerAsync
  );
  yield takeEvery("ADD_NEW_PRODUCT_SERVER_AC", AddNewProduct);
  yield takeEvery("SET_PRODUCTS_FETCH_SERVER_AC", LoadProduct);
  yield takeEvery("DELETE_PRODUCTS_FETCH_SERVER_AC", DeleteProduct);
  yield takeEvery("REDACT_PRODUCTS_FETCH_SERVER_AC", RedactProduct);
}
export default watchFetchDog;
