
const { Schema, model } = require("mongoose");

const RefreshModel = new Schema({
  userId: String,
  refreshToken: String,
  fingerprint: String,
  expiresIn: String,
  createdAt: String,
  status: String,
});
module.exports = model("Refresh", RefreshModel);

