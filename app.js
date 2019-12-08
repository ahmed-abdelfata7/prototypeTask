/**
 * @author Ahmed Mahmoud
 * @description
 * This is the entry point of backend app
 */
"use strict";
//importing used modules
const express = require("express");
const bodyParser = require("body-parser");
require("./utils/dbConnection");
const cors = require("cors");
//create express app
const app = express();
//body parser configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//allow CROS
app.use(cors());
//routes
require("./src/routes")(app);
module.exports = app;
