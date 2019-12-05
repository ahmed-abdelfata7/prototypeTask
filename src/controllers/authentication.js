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
}
module.exports = new AuthController();
