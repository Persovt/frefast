const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
//import routes from "./routes/index";
const routes = require('./routes/index')

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = config.get("PORT") ;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(bodyParser.raw());
app.use(cookieParser());



app.use("/api/", routes);

const start = (async () => {
  try {
    await mongoose.connect(config.get("URL"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(5005, () => console.log("server start on port: " + 5005));
  
  } catch (error) {
    console.log("server error start:" + error);
    process.exit();
  }
})();
