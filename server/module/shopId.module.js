
const { Schema, model } = require("mongoose");

const ShopIDShema = new Schema({
  ShopID: { type: String, required: true, unique: true },
  Name: { type: String, required: true, unique: true },
});

module.exports = model("ShopId", ShopIDShema);

