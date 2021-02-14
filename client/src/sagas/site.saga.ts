import { put } from "redux-saga/effects";
import {SiteSetConfigAC} from '../state/reducer/site.reducer'
const axios = require("axios").default;

function* cheackSite(action: any): any {
    try {
        
       
      const res = yield axios.post("/api/site/cheackSite", {siteName: action.payload});
  
      
     yield put(SiteSetConfigAC(res.data.candidat))
    } catch (error) {
      
      console.log(error.response.data.message);
    }
  }
  function* addSite(action: any): any {
    try {
        const { siteName } = action.payload
     
      const res = yield axios.post("/api/site/addSite", {siteName});
  
    
     
    } catch (error) {
      
      console.log(error.response.data.message);
    }
  }

  export {
    cheackSite,
    addSite
  };