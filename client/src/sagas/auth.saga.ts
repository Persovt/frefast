import { put } from "redux-saga/effects";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Cookies from "universal-cookie";
import { setDataAC, ChangeAuthStatusAc } from "../state/auth.reducer";

const axios = require("axios").default;
const cookies = new Cookies();

function* RegfetchServerAsync(action: any) {
  try {
    yield axios.post("/auth/register", {
      email: action.payload.email,
      password: action.payload.password,
    });
  } catch (error) {
    console.log(error.response.data.message);
  }
}
function* AuthfetchServerAsync(action: any) {
  try {
    const fp = yield FingerprintJS.load();
    const result = yield fp.get();

    yield axios.post("/auth/login", {
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
    const res = yield axios.post("/auth/verifyToken", {
      accesToken: cookies.get("accesToken"),
    });

    yield put(setDataAC(res.data));
    yield put(ChangeAuthStatusAc(true));
  } catch (error) {
    yield RefreshTokenfetchServerAsync();
    console.log(error.response.data.message);
  }
}

function* RefreshTokenfetchServerAsync(): any {
  try {
    const fp = yield FingerprintJS.load();
    const result = yield fp.get();

    yield axios.post("/auth/refresh-tokens", {
      refreshToken: cookies.get("refreshToken"),
      visitorId: result.visitorId,
    });

    yield ValidateTokenfetchServerAsync();
  } catch (error) {
    yield put(ChangeAuthStatusAc(false));
    console.log(error.response.data.message);
  }
}
export {
  RefreshTokenfetchServerAsync,
  ValidateTokenfetchServerAsync,
  AuthfetchServerAsync,
  RegfetchServerAsync,
};
