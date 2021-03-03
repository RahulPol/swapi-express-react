const expect = require("chai").expect;

const searchController = require("../controllers/search");

describe("Search Controller", () => {
  it("Should return data of all pages", async () => {
    const req = {
      query: {
        searchStr: "a",
      },
    };

    const res = {
      status: function (s) {
        this.statusCode = s;
        return this;
      },
      send: function (arg) {
        this.sendCalledWith = arg;
      },
    };

    await searchController.searchPlanets(req, res);
    expect(res.statusCode).to.equal(200);
    // if we get page wise data then max number of entries equals 10
    expect(res.sendCalledWith.length).to.equal(39);
  });
});
