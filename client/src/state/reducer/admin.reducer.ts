import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  currectInput: {},

};

const productReleases = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    AdminInputAC: (state, action) => {
        console.log(action.payload)
      state.currectInput[action.payload.name] = action.payload.value;
      
    },
    AdminApplyConfigAC: (state, action) => {
       
      
    },
   
   
  },
});

const { actions, reducer } = productReleases;

export const {
    AdminApplyConfigAC,
    AdminInputAC,
} = actions;

export default reducer;
