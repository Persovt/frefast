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
      state.orders = action.payload.orders.reverse()
   },
    OrderAddFetchServerAC: (state, action) => {},
    OrderLoadFetchServerAC: (state, action) => {},
    OrderRedactFetchServerAC: (state, action) => {},
  },
});

const { actions, reducer } = productReleases;

export const {
    OrderAddFetchServerAC,
    OrderLoadFetchServerAC,
    OrderSetAc,
    OrderRedactFetchServerAC
} = actions;

export default reducer;
