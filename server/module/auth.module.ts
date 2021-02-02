import { Schema } from "inspector";

const { Schema, model } = require("mongoose");

const UserShema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 
});

export default model("User", UserShema);
//export default {RegisterSchema,LoginSchema}
