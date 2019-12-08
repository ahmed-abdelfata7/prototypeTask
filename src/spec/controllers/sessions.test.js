require("../../../utils/testSetup");
const sessionController = require("../../controllers/sessions");
const usersController = require("../../controllers/users");
const authController = require("../../controllers/authentication");
/**
 * Session test scenario
 * saveUser
 * login to create,get token
 * delete token
 * get token which will be null
 */
it("Session first test scenario", async done => {
  let newUser = await usersController.save({
    name: "x",
    email: "xtest@xyz.xyz",
    password: "x"
  });
  expect(newUser.data.name).toBe("x");
  //create new token
  let login = await authController.login({
    email: "xtest@xyz.xyz",
    password: "x"
  });
  expect(login.success).toBe(true);
  //delete token for user
  await sessionController.delete(login.data.token);
  //get token details
  let tokenDetails = await sessionController.get({ token: login.data.token });
  expect(tokenDetails).toBe(null);
  done();
});
/**
 * Session test scenario
 * saveUser
 * login to create,get token
 * get token extract userId and check equailty with saveUser output should return true
 */
it("Session second test scenario", async done => {
  let newUser = await usersController.save({
    name: "x",
    email: "xtest2@xyz.xyz",
    password: "x"
  });
  //create new token
  let login = await authController.login({
    email: "xtest2@xyz.xyz",
    password: "x"
  });
  expect(login.success).toBe(true);
  //get token details
  let tokenDetails = await sessionController.get({ token: login.data.token });
  expect(`${tokenDetails.userId}` === `${newUser.data.id}`).toBe(true);
  done();
});
