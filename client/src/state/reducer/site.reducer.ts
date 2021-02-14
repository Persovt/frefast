import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
siteName: '',
config:{}
};

const productReleases = createSlice({
  name: "Site",
  initialState,
  reducers: {

    SiteCheackFetchServerAC: (state, action) => {
        
    },
    SiteLoadFetchServerAC: (state, action) => {
        
    },
    SiteAddFetchServerAC: (state, action) => {

    },

   SiteRedactFetchServerAC: (state, action) => {

   },
   SiteDeleteFetchServerAC: (state, action) => {

   },
   SiteSetConfigAC: (state, action) => {
    state.config = action.payload
   }
   
  },
});

const { actions, reducer } = productReleases;

export const {
    SiteCheackFetchServerAC,
    SiteLoadFetchServerAC,
    SiteAddFetchServerAC,
    SiteSetConfigAC,
    SiteRedactFetchServerAC,
    SiteDeleteFetchServerAC
} = actions;

export default reducer;
