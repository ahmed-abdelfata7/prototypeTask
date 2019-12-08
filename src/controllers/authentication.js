/**
 * @name AuthController
 * @type {class}
 * @description
 * This class used for managing Authentication layer including login,logout
 */
"use strict";
const User = require("./../models/User");
const bcrypt = require("bcrypt");
const ApiResponse = require("./../../utils/APIResponse");
const errorMSG = require("./../../utils/errorMsg");
const SessionController = require("./../controllers/sessions");
class AuthController {
  /**
   * @name login
   * @description check if account is valid or not
   * @param {Object}
   * @returns {Object}
   */
  async login(account) {
    let { email, password } = account;
    let checkRequired = this.required(account);
    if (checkRequired.length !== 0) {
      return ApiResponse(checkRequired, null);
    }
    let user = await User.findOne({ email });
    if (!user) {
      return ApiResponse(errorMSG.AUTH_ERROR, null);
    } else {
      //check password here
      let check = await bcrypt.compare(password, user.password);
      if (check) {
        //remove all sessions and save a new session
        await SessionController.deleteByUserId(user._id);
        await SessionController.save(user._id);
        let tokenDetails = await SessionController.get({ userId: user._id });
        return ApiResponse(null, { token: tokenDetails.token });
      } else {
        return ApiResponse(errorMSG.AUTH_ERROR, null);
      }
    }
  }

  /**
   * @name required
   * @description validate mandatory fields
   * @param {Object}
   * @returns {Array}
   */
  required(account) {
    const errors = [];
    let { password, email } = account;
    !email ? errors.push("Email is required!") : null;
    !password ? errors.push("Password is required!") : null;
    email && !this.validateEmail(email) ? errors.push("Not Valid email") : null;
    return errors;
  }
  /**
   * @name checkAuthorization
   * @description check if token exist in db or not
   * @param {String}
   * @returns {Boolean}
   */
  async checkAuthorization(token) {
    let tokenDetails = await SessionController.get({ token });
    if (!tokenDetails) {
      return false;
    } else {
      return true;
    }
  }
  /**
   * @name logout
   * @description delete user token
   * @param {String}
   * @returns {Object}
   */
  async logout(token) {
    if (token) {
      //check token existance
      let tokenDetails = await this.checkAuthorization(token);
      if (!tokenDetails) {
        return ApiResponse(errorMSG.INVALID_TOKEN, null);
      }
      await SessionController.delete(token);
      return ApiResponse(null, "Logged out successfully");
    } else {
      return ApiResponse(errorMSG.TOKEN_MISSED, null);
    }
  }
  /**
   * @name validateEmail
   * @param {String}
   * @returns {Boolean}
   */
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
module.exports = new AuthController();
