module.exports = app => {
  require("./auth")(app);
  require("./users")(app);
  require("./statistics")(app);
  require("./../middleware/authentication")(app);
};
