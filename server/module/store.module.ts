import { Schema } from "inspector";
const { Schema, model } = require("mongoose");

const StoreShema = new Schema({
  img: String,
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  amount: { type: Number },
  shopName: { type: String, required: true },
  typeProduct: { type: String },
  visibleCart: Boolean,
  cheackCart: Boolean
});

export default model("Store", StoreShema);
