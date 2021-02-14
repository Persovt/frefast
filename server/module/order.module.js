const {
  Schema,
  model
} = require("mongoose");

const OrderShema = new Schema({
  shopName: {
    type: String
  },
  userId: {
    type: String
  },
  data: {
    type: JSON
  },
  status: {
    type: String
  },
  products: {
    type: Array
  },
  price: {
    type: String
  },
});

module.exports = model("Order", OrderShema);