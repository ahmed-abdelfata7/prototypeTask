/**
 * @name User
 * @type {InstanceType}
 * @description
 * This model used for store user account information
 */
"use strict";
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number
  },
  updatedAt: {
    type: Number
  }
});
module.exports = mongoose.model("User", schema, "users");
