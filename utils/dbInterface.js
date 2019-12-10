"use strict";
/**
 * @name DB Interface
 * @type {Object}
 * @description
 * Interface for database collection:
 * find fetch all data from db
 */
const mongoose = require("mongoose");

module.exports = {
  async find(collectionName, condition) {
    return await mongoose.connection.db
      .collection(collectionName)
      .find(condition)
      .toArray();
  },
  async insertMany(collectionName, arr) {
    return await mongoose.connection.db
      .collection(collectionName)
      .insertMany(arr);
  }
};
