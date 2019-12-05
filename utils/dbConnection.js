"use strict";
const mongoose = require("mongoose");
const dbURL = process.env.DB_URL || "mongodb://localhost:27017/starwars";
mongoose.connect(
  dbURL,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database connected successfully");
  }
);
