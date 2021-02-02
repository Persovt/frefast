import { Schema } from "inspector";
const { Schema, model } = require("mongoose");

const TimeFileShema = new Schema({
  file: { type: String, required: true },
});

export default model("TimeFile", TimeFileShema);
