

  import { put } from "redux-saga/effects";
  const axios = require("axios").default;
  
  
  function* applyConfig(action: any) {
    try {
        const { priceDelivery } = action.payload
      console.log(priceDelivery, 'applyConfig')
       const res = yield axios.post("/api/admin/applyConfig", {priceDelivery});
  
   console.log(res.data)
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  
  export { applyConfig };
  