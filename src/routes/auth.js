/**
 * @name auth routes
 * @description
 * End points for login/logout auth layer
 */
const ApiURL = require("./../../utils/constants").API_URL;
const AuthController = require("./../controllers/authentication");
module.exports = app => {
  app.post(`${ApiURL}/login`, async (req, res, next) => {
    let login = await AuthController.login(req.body);
    return res.json(login);
  });
  app.get(`${ApiURL}/logout`, async (req, res, next) => {
    let token = req.headers["token"];
    let logout = await AuthController.logout(token);
    return res.json(logout);
  });
};
