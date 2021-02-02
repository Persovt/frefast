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

import {
  cheackSite,
  addSite
} from './site.saga'

import {
  addOrderFetchServer,
  loadOrderFetchServer
} from './order.saga'
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

  yield takeEvery('Site/SiteCheackFetchServerAC', cheackSite)
  yield takeEvery('Site/SiteAddFetchServerAC', addSite)

  yield takeEvery('Order/OrderAddFetchServerAC', addOrderFetchServer)
  yield takeEvery('Order/OrderLoadFetchServerAC', loadOrderFetchServer)
}
export default watchFetchDog;
