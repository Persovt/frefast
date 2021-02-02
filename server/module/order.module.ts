import { Schema } from "inspector";

const { Schema, model } = require("mongoose");

const OrderShema = new Schema({
  shopName: { type: String},
  userId: { type: String },
  data: { type: JSON},
  status: { type: String },
 products: { type: Array  },
});

export default model("Order", OrderShema);
//export default {RegisterSchema,LoginSchema}
