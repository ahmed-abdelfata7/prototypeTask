/**
 * @name AuthMiddleware
 * @description
 * Check if requested API is Authorized or not
 */
const ApiResponse = require("./../../utils/APIResponse");
const errorMSG = require("./../../utils/errorMsg");
const AuthController = require("./../controllers/authentication");
module.exports = app => {
  app.use((req, res, next) => {
    let token = req.headers["token"];
    if (!token) {
      return res.status(402).json(ApiResponse(errorMSG.UN_AUTHORIZED, null));
    } else {
      //check if token exist
      if (AuthController.checkAuthorization) {
        next();
      } else {
        return res.json(ApiResponse(errorMSG.UN_AUTHORIZED, null));
      }
    }
  });
};
