module.exports = app => {
  require("./auth")(app);
  require("./users")(app);
  require("./../middleware/authentication")(app);
};
