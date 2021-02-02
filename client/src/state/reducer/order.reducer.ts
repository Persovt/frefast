import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  cartProducts: [],
  currectInput: {},
  orders: []
};

const productReleases = createSlice({
  name: "Order",
  initialState,
  reducers: {
   OrderSetAc: (state, action) => {
     console.log(action.payload)
      state.orders = action.payload.orders
   },
    OrderAddFetchServerAC: (state, action) => {},
    OrderLoadFetchServerAC: (state, action) => {},
  },
});

const { actions, reducer } = productReleases;

export const {
    OrderAddFetchServerAC,
    OrderLoadFetchServerAC,
    OrderSetAc
} = actions;

export default reducer;
