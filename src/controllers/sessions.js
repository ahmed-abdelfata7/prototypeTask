/**
 * @name SessionsController
 * @type {class}
 * @description
 * This class used for managing user session
 */
"use strict";
const Session = require("./../models/Session");
const uuidv4 = require("uuid/v4");

class SessionsController {
  async save(userId) {
    let token = uuidv4();
    let newToken = new Session({ userId, token });
    await newToken.save();
  }
  async get(userId) {
    let token = await Session.findOne({ userId });
    return token;
  }
}
module.exports = new SessionsController();
