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
  /**
   * @name save
   * @description create a token for user
   * @param {String}
   * @returns {Object}
   */
  async save(userId) {
    let token = uuidv4();
    let newToken = new Session({ userId, token });
    await newToken.save();
  }
  /**
   * @name get
   * @description get session details from db
   * @param {Object}
   * @returns {Object}
   */
  async get(object) {
    let token = await Session.findOne(object);
    return token;
  }
  /**
   * @name delete
   * @description delete session
   * @param {String}
   * @returns {Object}
   */
  async delete(token) {
    await Session.findOneAndRemove({ token });
  }
  /**
   * @name delete
   * @description delete sessions by userId
   */
  async deleteByUserId(userId) {
    await Session.deleteMany({ userId });
  }
}
module.exports = new SessionsController();
