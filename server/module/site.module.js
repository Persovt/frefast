
const { Schema, model } = require("mongoose");

const SiteShema = new Schema({

  name: { type: String, required: true,  unique: true },
  adminId: { type: String },
  balance: { type: String },
  config: { type: JSON },
  
});

module.exports = model("Site", SiteShema);

