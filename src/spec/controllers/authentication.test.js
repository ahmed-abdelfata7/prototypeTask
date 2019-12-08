require("../../../utils/testSetup");
const authController = require("../../controllers/authentication");

//login without sending parameters
it("check login without sending parameters", async done => {
  let check = await authController.login({});
  expect(check.success).toBe(false);
  expect(check.errors.length).toBe(2);
  done();
});
//validate login parameters
it("check login required fileds", async done => {
  let required = authController.required({
    email: "ahmed.m.web.dev@gmail.com",
    password: "password"
  });
  expect(required.length).toBe(0);
  done();
});
//check required fileds
it("required fileds", async done => {
  let required = authController.required({});
  expect(required.length).toBe(2);
  done();
});
//validate email
it("is email", async done => {
  let email = authController.validateEmail("ahmed.m.web.dev@gmail.com");
  expect(email).toBe(true);
  done();
});
//logout without sending token
it("logout without sending token", async done => {
  let logout = await authController.logout();
  expect(logout.errors[0]).toBe("Missed Token");
  done();
});
//logout with sending fake-token
it("logout with sending fake-token", async done => {
  let logout = await authController.logout("fake-token");
  expect(logout.errors[0]).toBe("Invalid token");
  done();
});
//check authorization
it("check authorization", async done => {
  let auth = await authController.checkAuthorization("fake-token");
  expect(auth).toBe(false);
  done();
});
