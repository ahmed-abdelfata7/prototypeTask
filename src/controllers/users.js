/**
 * @name UsersController
 * @type {class}
 * @description
 * This class used for managing user account
 */
"use strict";
const User = require("./../models/User");
const apiResponse = require("./../../utils/APIResponse");
const bcrypt = require("bcrypt");
const SessionController = require("./sessions");
const saltRounds = 10;
class UsersController {
  /**
   * @name save
   * @description save user account details
   * @param {Object}
   * @returns {Object}
   */
  async save(user) {
    let { name, email, password } = user;
    let check = await this.validateUser(user);
    if (check.length !== 0) {
      return apiResponse(check, null);
    }
    try {
      //save user account
      let hasedPassword = await bcrypt.hash(password, saltRounds);
      let newUser = new User({ name, email, password: hasedPassword });
      let savedUser = await newUser.save({ new: true });
      await SessionController.save(savedUser._id);
      return apiResponse(null, {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      });
    } catch (err) {
      return apiResponse(["Error happened!!"], null);
    }
  }
  /**
   * @name validateUser
   * @description validate user account mandatory fileds
   * @param {Object}
   * @returns {Array}
   */
  async validateUser(user) {
    let { name, email, password } = user;
    const errors = [];
    !name ? errors.push("Name is Required!") : null;
    !email ? errors.push("Email is Required!") : null;
    !password ? errors.push("Password is Required!") : null;
    //check if email exist
    const userDetails = await User.findOne({ email });
    userDetails && Object.keys(userDetails).length !== 0
      ? errors.push("Email already exist!")
      : null;
    return errors;
  }
}
module.exports = new UsersController();
