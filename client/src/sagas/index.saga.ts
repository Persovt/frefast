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
  yield takeEvery("Auth/AuthLoginFetchServerAc", AuthfetchServerAsync);
  yield takeEvery("Auth/AuthRegFetchServerAc", RegfetchServerAsync);
  yield takeEvery(
    "Auth/AuthValidateTokenFetchServerAc",
    ValidateTokenfetchServerAsync
  );
  yield takeEvery("Store/StoreAddProductFetchServerAC", AddNewProduct);
  yield takeEvery("Store/StoreLoadProductFetchServerAC", LoadProduct);
  yield takeEvery("Store/StoreDeleteProductFetchServerAC", DeleteProduct);
  yield takeEvery("Store/StoreRedactProductFetchServerAC", RedactProduct);
}
export default watchFetchDog;
