
const { Schema, model } = require("mongoose");

const OrderShema = new Schema({
  shopName: { type: String},
  userId: { type: String },
  data: { type: JSON},
  status: { type: String },
 products: { type: Array  },
});

module.exports = model("Order", OrderShema);
