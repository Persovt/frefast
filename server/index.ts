const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
import { Router } from "express";
import routes from "./routes/index";
import generateId from "./generateID";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = config.get("PORT") | 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", routes);

const start = (async () => {
  try {
    await mongoose.connect(config.get("URL"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log("server start on port: " + PORT));
    generateId();
  } catch (error) {
    console.log("server error start:" + error);
    process.exit();
  }
})();
