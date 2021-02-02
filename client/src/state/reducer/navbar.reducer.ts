import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  currectInput: {},
  visibleAuthSideBar: false
};

const productReleases = createSlice({
  name: "NavBar",
  initialState,
  reducers: {
    NavBarInputAC: (state, action) => {
      state.currectInput[action.payload.name] = action.payload.value;
      console.log(action.payload, state);
    },
    NavBarChangeVisibleAuthSideBarAC: (state, action) => {
        state.visibleAuthSideBar = action.payload;
        console.log(action.payload);
      },
   
  },
});

const { actions, reducer } = productReleases;

export const {
    NavBarChangeVisibleAuthSideBarAC,
    NavBarInputAC
} = actions;

export default reducer;
