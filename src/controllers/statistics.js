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
  /**
   * @name longestOpeningCrawl
   * @description fetch the longest opening crawl movie
   * based on charaters length
   * @returns {Object}
   */
  async longestOpeningCrawl() {
    const films = await this.allFilms();
    let longestFilm = films.reduce((pre, curr) => {
      return pre && pre.opening_crawl.length > curr.opening_crawl.length
        ? pre
        : curr;
    }, 0);
    return longestFilm;
  }
  /**
   * @name mostPersonAppeared
   * @description fetch the most famous person
   * who is most appeared in movies
   * @returns {Object}
   */

  async mostPersonAppeared() {
    const films = await this.allFilms();
    const result = [];
    //get all persons
    films.forEach(film => {
      result.push(...film.characters);
    });
    //calculate duplicates
    const personsCount = result.reduce(
      (pre, curr) => (
        (
          pre[pre.findIndex(d => d.element === curr)] ||
          pre[pre.push({ element: curr, count: 0 }) - 1]
        ).count++,
        pre
      ),
      []
    );
    //get most repeated person
    const mostRepeatedPerson = personsCount.reduce((prev, curr) => {
      return prev.count > curr.count ? prev : curr;
    });
    //get person details
    let personDetails = await this.personDetails(mostRepeatedPerson);
    return personDetails;
  }
  async mostSpeciesAppeared() {
    return {
      title: "requirement not clear"
    };
  }
  async plantWithMostPilots() {
    return {
      title: "requirement not clear"
    };
  }
  /**
   * @name allStatistics
   * @description get mostPersonAppeared,longestOpeningCrawl
   * @returns {Object}
   */
  async allStatistics() {
    let longestOpenCrawl = await this.longestOpeningCrawl();
    let mostPersonAppear = await this.mostPersonAppeared();
    let mostSpeciesAppeared = await this.mostSpeciesAppeared();
    let plantWithPilots = await this.plantWithMostPilots();
    let ResponseData = {
      openingCrawl: longestOpenCrawl.title,
      personAppeared: mostPersonAppear[0].name,
      mostSpeciesAppeared: mostSpeciesAppeared.title,
      plantWithPilots: plantWithPilots.title
    };
    return ResponseData;
  }

  /**
   * @name allFilms
   * @description fetch all movies from DB
   * @returns {Array}
   */

  async allFilms() {
    let collectionName = "films";
    const films = await dbInterface.find(collectionName, {});
    return films;
  }
  /**
   * @name personDetails
   * @description fetch person details from people schema
   * @returns {Array}
   */

  async personDetails(person) {
    let collectionName = "people";
    return await dbInterface.find(collectionName, { id: person.element });
  }
}
module.exports = new StatisticsController();
