import { put } from "redux-saga/effects";
const axios = require("axios").default;

function* cheackSite(action: any): any {
    try {
        
       console.log(action.payload)
      const res = yield axios.post("/site/cheackSite", {siteName: action.payload});
  
      console.log(res.data)
     
    } catch (error) {
      
      console.log(error.response.data.message);
    }
  }
  function* addSite(action: any): any {
    try {
        const { siteName } = action.payload
       console.log(action.payload)
      const res = yield axios.post("/site/addSite", {siteName});
  
      console.log(res.data)
     
    } catch (error) {
      
      console.log(error.response.data.message);
    }
  }

  export {
    cheackSite,
    addSite
  };