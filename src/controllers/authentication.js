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
        let tokenDetails = await SessionController.get(user._id);
        return ApiResponse(null, { token: tokenDetails.token });
      } else {
        return ApiResponse(errorMSG.AUTH_ERROR, null);
      }
    }
  }
  required(account) {
    const errors = [];
    let { password, email } = account;
    !email ? errors.push("Email is required!") : null;
    !password ? errors.push("Password is required!") : null;
    return errors;
  }
}
module.exports = new AuthController();
