import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState: any = {
  error: "",
  fetching: false,
  currectInput: {},
  data: {},
  loggin: false,
  storeProducts: {},
};

export const AuthFetchServerAC = createAction("AUTH_FETCHED_SERVER");
export const AddNewProductServerAC = createAction("ADD_NEW_PRODUCT_SERVER_AC");
export const RegFetchServerAC = createAction("REG_FETCHED_SERVER");
export const ValidateTokenFetchServerAC = createAction(
  "VALIDATE_TOKEN_FETCHED_SERVER"
);
export const SetProductsFetchServerAC = createAction(
  "SET_PRODUCTS_FETCH_SERVER_AC"
);
export const RedactProductsFetchServerAC = createAction(
  "REDACT_PRODUCTS_FETCH_SERVER_AC"
);
export const DeleteProductsFetchServerAC = createAction(
  "DELETE_PRODUCTS_FETCH_SERVER_AC"
);

const productReleases = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    inputReducer: (state, action) => {
      state.currectInput[action.payload.name] = action.payload.value;
      console.log(action.payload, state);
    },
    setDataAC: (state, action) => {
      state.data = action.payload;
      console.log(action.payload, state);
    },
    ChangeAuthStatusAc: (state, action) => {
      state.loggin = action.payload;
    },
    setStoreProductAC: (state, action) => {
      state.storeProducts = action.payload;
      console.log(action.payload, state);
    },
  },
});

const { actions, reducer } = productReleases;

export const {
  inputReducer,
  setDataAC,
  ChangeAuthStatusAc,
  setStoreProductAC,
} = actions;

export default reducer;
