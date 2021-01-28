import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  cartProducts: {},
  currectInput: {},
};

const productReleases = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    CartInputAC: (state, action) => {
      state.currectInput[action.payload.name] = action.payload.value;
      console.log(action.payload, state);
    },
    CartAddProductAC: (state, action) => {
      //state.currectInput[action.payload.name] = action.payload.value;
      console.log(action.payload, state);
    },
    CartDeleteProductAC: (state, action) => {},
    CartChangeProductAC: (state, action) => {},
  },
});

const { actions, reducer } = productReleases;

export const {
  CartDeleteProductAC,
  CartAddProductAC,
  CartChangeProductAC,
  CartInputAC
} = actions;

export default reducer;
