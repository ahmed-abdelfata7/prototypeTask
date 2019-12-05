/**
 * @name Session
 * @type {InstanceType}
 * @description
 * This model used for store user session
 */
"use strict";
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  userId: {
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
module.exports = mongoose.model("Session", schema, "sessions");
