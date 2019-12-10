/**
 * @name statistics routes
 * @description
 * End points for statistics
 */
const ApiURL = require("./../../utils/constants").API_URL;
const StatisticsController = require("./../controllers/statistics");
const ApiResponse = require("./../../utils/APIResponse");
module.exports = app => {
  app.get(`${ApiURL}/statistics`, async (req, res, next) => {
    try {
      let statistics = await StatisticsController.allStatistics();
      return res.json(ApiResponse(null, statistics));
    } catch (err) {
      return res.json(ApiResponse(["db not contains star war schema"], null));
    }
  });
};
