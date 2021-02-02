import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
siteName: ''
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
   
  },
});

const { actions, reducer } = productReleases;

export const {
    SiteCheackFetchServerAC,
    SiteLoadFetchServerAC,
    SiteAddFetchServerAC,
    SiteRedactFetchServerAC,
    SiteDeleteFetchServerAC
} = actions;

export default reducer;
