import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth.reducer";
import cartReducer from "./reducer/cart.reducer";
import storeReducer from "./reducer/store.reducer";
import navbarReducer from "./reducer/navbar.reducer";
import orderReducer from "./reducer/order.reducer";
import createSagaMiddleware from "redux-saga";
import mySaga from "../sagas/index.saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    authReducer,
    cartReducer,
    storeReducer,
    navbarReducer,
    orderReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(mySaga);

export default store;
