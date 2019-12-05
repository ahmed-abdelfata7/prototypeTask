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
  async find(collectionName) {
    return await mongoose.connection.db
      .collection(collectionName)
      .find()
      .toArray();
  }
};
