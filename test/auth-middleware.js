const expect = require("chai").expect;

const authMiddleware = require("../middleware/isAuthenticated");

describe("Auth Middleware", function () {
  it("should return 401 if user is absent", function () {
    const req = {
      session: {
        user: undefined,
      },
    };

    const res = {
      status: function (s) {
        this.statusCode = s;
        return this;
      },
      send: function () {},
    };

    authMiddleware(req, res, {});
    expect(res.statusCode).to.equal(401);
  });
});
