import { ConsoleSqlOutlined } from "@ant-design/icons";
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  cartProducts: [],
  currectInput: {},
  visibleConfirmModel: false,
  cartTypes: [],
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
    
     state.cartTypes = Array.from(new Set([...state.cartTypes, action.payload.typeProduct]))
      state.cartProducts =  [...state.cartProducts, action.payload]
    },
    CartDeleteProductAC: (state, action) => {},
    CartChangeProductAC: (state, action) => {},
    CartOpenConfirmModelAC: (state, action) => {
      state.visibleConfirmModel = action.payload
      
    },
  },
});

const { actions, reducer } = productReleases;

export const {
  CartDeleteProductAC,
  CartAddProductAC,
  CartChangeProductAC,
  CartInputAC,
  CartOpenConfirmModelAC,
  
} = actions;

export default reducer;
