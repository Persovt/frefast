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
    } = action.payload;
    console.log(cookies.get("siteName"));
    if (adres && city && index && street)
      yield axios.post("/order/addOrder", {
        adres,
        city,
        index,
        siteName: cookies.get("siteName"),
        street,
        userId,
        products,
      });
    if (siteName) {
      const res = yield axios.post("/apisite/addSite", {
        userId,
        siteName,
      });
      console.log(res.data);
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
}

function* loadOrderFetchServer(action: any): any {
  try {
    //const { siteName } = action.payload;

    const res = yield axios.post("/api/order/loadOrder", {
     // siteName
    });
    yield put(OrderSetAc(res.data))
    console.log(res.data)
  } catch (error) {
    console.log(error.response.data.message);
  }
}
export { addOrderFetchServer, loadOrderFetchServer };
