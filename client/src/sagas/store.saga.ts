import {
  StoreSetProductAC,
  StoreInputAC,
} from "../state/reducer/store.reducer";
import { put } from "redux-saga/effects";
const axios = require("axios").default;

function toBase64(arr: any) {
  //arr = new Uint8Array(arr) if it's an ArrayBuffer
  return btoa(
     arr.reduce((data: any, byte: any) => data + String.fromCharCode(byte), '')
  );
}

function* uploadImageToServer(action: any) {
  try {
    const uploadImage = yield fetch(action).then((r: any) => r.blob());
    const formData = new FormData();
    formData.append("file", uploadImage);
   

    const res = yield axios({
      method: "post",
      url: "/store/createTimeFile",
      data: formData,

      headers: { "Content-Type": `multipart/form-data` },
    });

   return res.data
  } catch (error) {
    console.log(error.response.data.message);
  }
}

function* AddNewProduct(action: any) {
  try {
    //const uploadImage = yield fetch(action.payload.uploadImage).then((r: any) => r.blob());
    console.log(action.payload)
    const { amountProduct,descriprionProduct,nameProduct,uploadImage,priceProduct,typeProduct } = action.payload
   // console.log(amountProduct,descriprionProduct)
  //  const IdUploadFile = yield uploadImageToServer(uploadImage);
    //console.log(IdUploadFile)
     yield axios({
        method: 'post',
        url: "/store/addNewProduct",
        data: {
          TimeImageId: yield uploadImageToServer(uploadImage),
          descriprionProduct,
          nameProduct,
          amountProduct,
          priceProduct,
          typeProduct
        },

        })
    //console.log(yield uploadImage(action.payload.uploadImage))

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

    yield put(StoreSetProductAC(res.data));
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
