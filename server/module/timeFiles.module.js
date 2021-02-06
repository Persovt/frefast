const {
  Schema,
  model
} = require("mongoose");

const TimeFileShema = new Schema({
  file: {
    type: String,
    required: true
  },
});

module.exports = model("TimeFile", TimeFileShema)