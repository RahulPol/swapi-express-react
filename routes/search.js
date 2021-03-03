const express = require("express");
const axios = require("axios");

const constants = require("../util/constants");

const searchRoutes = express.Router();
searchRoutes.get("/planets", async (req, res) => {
  try {
    let query = req.query.searchStr;
    console.log(`query ${query}`);
    const response = await axios.get(
      constants.SWAPI_BASE_URL + "/planets?search=" + query
    );
    if (!response) {
      return res.send([]);
    }
    res.send(response.data.results);
  } catch (err) {
    res.status(500).send(parseError(err));
  }
});

module.exports = searchRoutes;
