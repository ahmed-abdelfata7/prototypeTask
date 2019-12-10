"use strict";
const mongoose = require("mongoose");
const remoteDB = "mongodb://ahmed:ahmed123@ds353338.mlab.com:53338/prototask";
const dbURL = "mongodb://localhost:27017/starwars";

mongoose.connect(
  remoteDB,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database connected successfully");
  }
);
