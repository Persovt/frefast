import { put } from "redux-saga/effects";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Cookies from "universal-cookie";
import { AuthSetDataAC, AuthChangeStatusAC } from "../state/reducer/auth.reducer";

const axios = require("axios").default;
const cookies = new Cookies();

function* RegfetchServerAsync(action: any) {
  try {
    yield axios.post("/api/auth/register", {
      email: action.payload.email,
      password: action.payload.password,
    });
  } catch (error) {
    console.log(error.response.data.message);
  }
}

function* LogoutfetchServerAsync(action: any) {
  try {
    yield axios.post("/api/auth/logout");
    yield put(AuthChangeStatusAC(false));
  } catch (error) {
    console.log(error.response.data.message);
  }
}
function* AuthfetchServerAsync(action: any) {
  try {
    
    const fp = yield FingerprintJS.load();
    const result = yield fp.get();
    console.log(result)
    yield axios.post("/api/auth/login", {
      email: action.payload.email,
      password: action.payload.password,
      visitorId: result.visitorId,
    });
   
    yield ValidateTokenfetchServerAsync();
  } catch (error) {
    console.log(error.response.data.message);
  }
}
function* ValidateTokenfetchServerAsync() {
  try {
    const res = yield axios.post("/api/auth/verifyToken", {
      accesToken: cookies.get("accesToken"),
    });

    yield put(AuthSetDataAC(res.data));
    yield put(AuthChangeStatusAC(true));
  } catch (error) {
    yield RefreshTokenfetchServerAsync();
    console.log(error.response.data.message);
  }
}

function* RefreshTokenfetchServerAsync(): any {
  try {
    const fp = yield FingerprintJS.load();
    const result = yield fp.get();
    
    yield axios.post("/api/auth/refresh-tokens", {
      refreshToken: cookies.get("refreshToken"),
      visitorId: result.visitorId,
    });

    yield ValidateTokenfetchServerAsync();
  } catch (error) {
    yield put(AuthChangeStatusAC(false));
    console.log(error.response.data.message);
  }
}
export {
  RefreshTokenfetchServerAsync,
  ValidateTokenfetchServerAsync,
  AuthfetchServerAsync,
  RegfetchServerAsync,
  LogoutfetchServerAsync,
};
