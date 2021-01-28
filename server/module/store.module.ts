import { Schema } from "inspector";
const { Schema, model } = require("mongoose");

const StoreShema = new Schema({
  img: String,
  name: { type: String, required: true },
  description: { type: String },
  price: { type: String },
  visiblePrice: { type: String },
});

export default model("Store", StoreShema);
