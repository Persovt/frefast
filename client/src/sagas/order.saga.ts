import Cookies from "universal-cookie";
import { put } from "redux-saga/effects";
import {OrderSetAc} from '../state/reducer/order.reducer'



const axios = require("axios").default;
const cookies = new Cookies();

function* addOrderFetchServer(action: any): any {
  try {
    const {
      adres,
      city,
      index,
      siteName,
      street,
      userId,
      products,
      price
    } = action.payload;
    console.log(action.payload)
    console.log(cookies.get("siteName"));
    if (adres && city && index && street)
      yield axios.post("/api/order/addOrder", {
        adres,
        city,
        index,
        siteName: cookies.get("siteName"),
        street,
        userId,
        products,
        price
      });
    if (siteName) {
      const res = yield axios.post("/api/apisite/addSite", {
        userId,
        siteName,
      });
      console.log(res.data);
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
}

function* loadOrderFetchServer(): any {
  try {
    //const { siteName } = action.payload;

    const res = yield axios.post("/api/order/loadOrder", {
     // siteName
    });
    yield put(OrderSetAc(res.data))
   
  } catch (error) {
    console.log(error.response.data.message);
  }
}
function* OrderRedactFetchServer(action: any): any {
  try {
    const { status,id } = action.payload;

    const res = yield axios.post("/api/order/redact", {
      status,id
    });
   
   
    yield loadOrderFetchServer()
    
  } catch (error) {
    console.log(error.response.data.message);
  }
}
export { addOrderFetchServer, loadOrderFetchServer,OrderRedactFetchServer };
