import { Schema } from "inspector";
const { Schema, model } = require("mongoose");

const ShopIDShema = new Schema({
  ShopID: { type: String, required: true, unique: true },
  Name: { type: String, required: true, unique: true },
});

export default model("ShopId", ShopIDShema);
