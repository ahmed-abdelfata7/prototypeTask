const apiRes = require("./../../../utils/APIResponse");
//API response in success mode
it("Should return data", done => {
  let check = apiRes(null, "testData");
  expect(check.success).toBe(true);
  done();
});
//API response in error mode
it("Should return data", done => {
  let check = apiRes("test-error", null);
  expect(check.success).toBe(false);
  done();
});
