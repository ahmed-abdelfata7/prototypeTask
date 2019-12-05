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
  async get(object) {
    let token = await Session.findOne(object);
    return token;
  }
  async delete(token) {
    await Session.findOneAndRemove({ token });
  }
}
module.exports = new SessionsController();
