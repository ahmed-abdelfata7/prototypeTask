/**
 * @name StatisticsController
 * @type {class}
 * @description
 * Statistics controller:
 * Get longest opening crawl
 */
"use strict";
const dbInterface = require("./../../utils/dbInterface");
class StatisticsController {
  async longestOpeningCrawl() {
    let collectionName = "films";
    const films = await dbInterface.find(collectionName);
    let longestFilm = films.reduce((pre, curr) => {
      return pre && pre.opening_crawl.length > curr.opening_crawl.length
        ? pre
        : curr;
    }, 0);
    return longestFilm;
  }
}
module.exports = new StatisticsController();
