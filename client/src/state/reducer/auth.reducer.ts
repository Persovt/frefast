import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  error: "",
  fetching: false,
  currectInput: {},
  data: {},
  loggin: false,
};

const productReleases = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    AuthLoginFetchServerAc: () => {},
    AuthRegFetchServerAc: () => {},
    AuthValidateTokenFetchServerAc: () => {},
    AuthInputAC: (state, action) => {
      state.currectInput[action.payload.name] = action.payload.value;
      console.log(action.payload, state);
    },
    AuthSetDataAC: (state, action) => {
      state.data = action.payload;
      console.log(action.payload, state);
    },
    AuthChangeStatusAC: (state, action) => {
      state.loggin = action.payload;
    },
  },
});

const { actions, reducer } = productReleases;

export const {
  AuthInputAC,
  AuthSetDataAC,
  AuthChangeStatusAC,
  AuthLoginFetchServerAc,
  AuthRegFetchServerAc,
  AuthValidateTokenFetchServerAc
} = actions;

export default reducer;
