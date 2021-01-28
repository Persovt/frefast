import { setStoreProductAC } from "../state/auth.reducer";
import { put } from "redux-saga/effects";
const axios = require("axios").default;

function* AddNewProduct(action: any) {
  try {
    yield axios.post("/store/addNewProduct", {
      nameProduct: action.payload.nameProduct,
      descriprionProduct: action.payload.descriprionProduct,
    });

    yield LoadProduct();
  } catch (error) {
    console.log(error.response.data.message);
  }
}

function* DeleteProduct(action: any) {
  try {
    yield axios.post("/store/deleteProduct", { id: action.payload.currectId });

    yield LoadProduct();
  } catch (error) {
    console.log(error.response.data.message);
  }
}

function* LoadProduct() {
  try {
    const res = yield axios.get("/store/LoadProduct");

    yield put(setStoreProductAC(res.data));
  } catch (error) {
    console.log(error.response.data.message);
  }
}

function* RedactProduct(action: any) {
  try {
    yield axios.post("/store/redactProduct", action.payload);

    yield LoadProduct();
  } catch (error) {
    console.log(error.response.data.message);
  }
}

export { AddNewProduct, LoadProduct, DeleteProduct, RedactProduct };
