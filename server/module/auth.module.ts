import { Schema } from "inspector";

const { Schema, model } = require("mongoose");

const UserShema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: String,
});

export default model("User", UserShema);
//export default {RegisterSchema,LoginSchema}
