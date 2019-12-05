/**
 * @name statistics routes
 * @description
 * End points for statistics
 */
const ApiURL = require("./../../utils/constants").API_URL;
const StatisticsController = require("./../controllers/statistics");
module.exports = app => {
  app.get(`${ApiURL}/statistics`, async (req, res, next) => {
    let statistics = await StatisticsController.longestOpeningCrawl(req.body);
    return res.json(statistics);
  });
};
