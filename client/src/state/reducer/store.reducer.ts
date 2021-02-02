import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  storeProducts: {},
  currectInput: {
    typeProduct: 'product'
  },
  cartProducts: {},
  visibleCreateModel: false,
  visibleRedactModel: false,
  currectId: "",
  uploadImageLoading: false,
  hoverAddCartButton: false,
};

const productReleases = createSlice({
  name: "Store",
  initialState,
  reducers: {
    StoreAddProductFetchServerAC: (state, action) => {
      state.visibleCreateModel = false;
    },
    StoreLoadProductFetchServerAC: () => {},
    StoreRedactProductFetchServerAC: (state, action) => {
      state.visibleRedactModel = false;
    },
    StoreDeleteProductFetchServerAC: (state, action) => {
      state.visibleRedactModel = false;
    },
    StoreInputAC: (state, action) => {
     
      state.currectInput[action.payload.name] = action.payload.value;
     
    },
    StoreSetProductAC: (state, action) => {
      state.storeProducts = action.payload;
     
    },
    StoreChangeVisibleCreateModelAC: (state, action) => {
      console.log(action.payload);
      state.visibleCreateModel = action.payload;
    },
    StoreChangeVisibleRedactModelAC: (state, action) => {
      state.visibleRedactModel = action.payload;

      if (action.payload) state.currectId = "";
    },
    StoreSetCurrectIdAC: (state, action) => {
      state.currectId = action.payload;
    },
    StoreSetStatusUploadingAC: (state, action) => {
      state.uploadImageLoading = action.payload;
    },
    StoreHoverAddCartButtonAC: (state, action) => {
      console.log(action)
      state.storeProducts[action.payload.id].visibleCart = action.payload.value
      //state.hoverAddCartButton = action.payload;
    },
  },
});

const { actions, reducer } = productReleases;

export const {
  StoreSetCurrectIdAC,
  StoreHoverAddCartButtonAC,
  StoreSetStatusUploadingAC,
  StoreChangeVisibleCreateModelAC,
  StoreChangeVisibleRedactModelAC,
  StoreAddProductFetchServerAC,
  StoreInputAC,
  StoreLoadProductFetchServerAC,
  StoreRedactProductFetchServerAC,
  StoreDeleteProductFetchServerAC,
 
  StoreSetProductAC,
} = actions;

export default reducer;
