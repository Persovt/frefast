import {
  AuthfetchServerAsync,
  RegfetchServerAsync,
  ValidateTokenfetchServerAsync,
  LogoutfetchServerAsync
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
  loadOrderFetchServer,
  OrderRedactFetchServer
} from './order.saga'
import {
  applyConfig
} from './admin.saga'
import { takeEvery } from "redux-saga/effects";

function* watchFetchDog() {
  yield takeEvery("Auth/AuthLoginFetchServerAc", AuthfetchServerAsync);
  yield takeEvery("Auth/AuthRegFetchServerAc", RegfetchServerAsync);
  yield takeEvery(
    "Auth/AuthValidateTokenFetchServerAc",
    ValidateTokenfetchServerAsync
  );
yield takeEvery('Auth/AuthLogoutFetchServerAc' , LogoutfetchServerAsync)

  yield takeEvery("Store/StoreAddProductFetchServerAC", AddNewProduct);
  yield takeEvery("Store/StoreLoadProductFetchServerAC", LoadProduct);
  yield takeEvery("Store/StoreDeleteProductFetchServerAC", DeleteProduct);
  yield takeEvery("Store/StoreRedactProductFetchServerAC", RedactProduct);

  yield takeEvery('Site/SiteCheackFetchServerAC', cheackSite)
  yield takeEvery('Site/SiteAddFetchServerAC', addSite)

  yield takeEvery('Order/OrderRedactFetchServerAC', OrderRedactFetchServer)
  yield takeEvery('Cart/CardOrderAddFetchServerAC', addOrderFetchServer)
  yield takeEvery('Order/OrderLoadFetchServerAC', loadOrderFetchServer)

  yield takeEvery('Admin/AdminApplyConfigAC', applyConfig)
}
export default watchFetchDog;
