module.exports = app => {
  require("./auth")(app);
  require("./users")(app);
};
