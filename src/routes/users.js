/**
 * @name users routes
 * @description
 * End points for user Model
 */
const ApiURL = require("./../../utils/constants").API_URL;
const usersController = require("./../controllers/users");
module.exports = app => {
  app.post(`${ApiURL}/users/save`, async (req, res, next) => {
    let saveUser = await usersController.save(req.body);
    return res.json(saveUser);
  });
};
