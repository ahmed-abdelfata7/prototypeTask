/**
 * @author Ahmed Mahmoud
 * @description
 * This is the entry point of backend app
 */
"use strict";
//importing used modules
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./utils/dbConnection");
const cors = require("cors");
//create express app
const app = express();
//server configuration
const PORT = process.env.SERVER_PORT || 6000;
const HOST = process.env.SERVER_IP || "http://localhost";
//body parser configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//allow CROS
app.use(cors());
//routes
require("./src/routes")(app);
//running express server
app.listen(PORT, () => {
  console.log(`Server is running at ${HOST}:${PORT}`);
});
