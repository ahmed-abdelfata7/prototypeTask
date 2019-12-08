require("../../../utils/testSetup");
const usersController = require("../../controllers/users");
//saving user
it("Session second test scenario", async done => {
  let newUser = await usersController.save({
    name: "x",
    email: "xtest2@xyz.xyz",
    password: "x"
  });
  expect(newUser.data.name).toBe("x");
  done();
});
//saving user without name
it("Session second test scenario", async done => {
  let newUser = await usersController.save({
    email: "xtest3@xyz.xyz",
    password: "x"
  });
  expect(newUser.success).toBe(false);
  done();
});
//validate user data
it("Validate user data", async done => {
  let validate = await usersController.validateUser({
    email: "xtest1@xyz.xyz",
    password: "x"
  });
  expect(validate.length).toBe(1);
  done();
});
