"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const PORT = process.env.SERVER_PORT || 6000;
const HOST = process.env.SERVER_IP || "http://localhost";
require("./utils/dbConnection");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running at ${HOST}:${PORT}`);
});
