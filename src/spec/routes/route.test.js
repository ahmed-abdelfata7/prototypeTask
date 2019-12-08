/**
 * Testing All End-points
 */
//isolate app from server to solve port in used error.
const app = require("../../../app");
const supertest = require("supertest");
const request = supertest(app);
const API_URL = require("../../../utils/constants").API_URL;
require("../../../utils/testSetup");
//signup with sending all parameters
it("Save user(signup)", async done => {
  const res = await request.post(`${API_URL}/users/save`).send({
    email: "ahmed.m.web.dev@gmail.com",
    password: "password",
    name: "ahmed mahmoud"
  });
  expect(res.body.success).toBe(true);
  expect(res.status).toBe(200);
  done();
});
//signup with sending exisiting email
it("Save user(signup) with email exist before", async done => {
  const res = await request.post(`${API_URL}/users/save`).send({
    email: "ahmed.m.web.dev@gmail.com",
    password: "password",
    name: "ahmed mahmoud"
  });
  expect(res.body.success).toBe(false);
  expect(res.body.errors[0]).toBe("Email already exist!");
  expect(res.status).toBe(200);
  done();
});
//signup with a missed parameters (email,name)
it("Save user(signup) with a missed parameters email,name", async done => {
  const res = await request.post(`${API_URL}/users/save`).send({
    password: "password"
  });
  expect(res.body.success).toBe(false);
  expect(res.body.errors.length).toBe(2);
  expect(res.status).toBe(200);
  done();
});
//test login with correct email/password
it("Login with incorrect credentials", async done => {
  const res = await request.post(`${API_URL}/login`).send({
    email: "testing@gmail.com",
    password: "password"
  });
  expect(res.body.success).toBe(false);
  done();
});
//test login with incorrect email/password
it("Login with correct credentials", async done => {
  const res = await request.post(`${API_URL}/login`).send({
    email: "ahmed.m.web.dev@gmail.com",
    password: "password"
  });
  expect(res.body.success).toBe(true);
  done();
});
//logout without sending token
it("Logout without sending token", async done => {
  const res = await request.get(`${API_URL}/logout`);
  expect(res.body.success).toBe(false);
  expect(res.status).toBe(200);
  done();
});
//logout with sending fack token
it("Logout with sending fake token", async done => {
  const res = await request.get(`${API_URL}/logout`).query({
    token: "fake-token"
  });
  expect(res.body.success).toBe(false);
  expect(res.status).toBe(200);
  done();
});
//access authorized end-point without sending token
it("access statistics endpoint without connecting to remote db", async done => {
  const res = await request.get(`${API_URL}/statistics`);
  console.log(res.body);
  expect(res.body.success).toBe(false);
  expect(res.body.errors[0]).toBe("Authorization Error");
  expect(res.status).toBe(402);
  done();
});
