import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  storeProducts: {},
  currectInput: {},
  cartProducts: {},
  visibleCreateModel: false,
  visibleRedactModel: false,
  currectId: ''
};

const productReleases = createSlice({
  name: "Store",
  initialState,
  reducers: {
    StoreAddProductFetchServerAC: (state,action) => {
        state.visibleCreateModel = false
    },
    StoreLoadProductFetchServerAC: () => {},
    StoreRedactProductFetchServerAC: (state,action) => {
        state.visibleRedactModel = false
    },
    StoreDeleteProductFetchServerAC: (state, action) => {
        state.visibleRedactModel = false
    },
    StoreInputAC: (state, action) => {
        console.log(action)
      state.currectInput[action.payload.name] = action.payload.value;
      console.log(action.payload, state);
    },
    StoreSetProductAC: (state, action) => {
      state.storeProducts = action.payload;
      console.log(action.payload, state);
    },
    StoreChangeVisibleCreateModelAC: (state, action) => {
        console.log(action.payload)
        state.visibleCreateModel =  action.payload
      },
      StoreChangeVisibleRedactModelAC: (state, action) => {
        state.visibleRedactModel =  action.payload

        if(action.payload) state.currectId = ''
      },
      StoreSetCurrectIdAC: (state, action) => {
        state.currectId = action.payload  
      },
  },
});

const { actions, reducer } = productReleases;

export const {
    StoreSetCurrectIdAC,
    StoreChangeVisibleCreateModelAC,
    StoreChangeVisibleRedactModelAC,
  StoreAddProductFetchServerAC,
  StoreInputAC,
  StoreLoadProductFetchServerAC,
  StoreRedactProductFetchServerAC,
  StoreDeleteProductFetchServerAC,
  StoreSetProductAC
} = actions;

export default reducer;
