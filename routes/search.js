const express = require("express");

const searchController = require("../controllers/search");

const searchRoutes = express.Router();

searchRoutes.get("/planets", searchController.searchPlanets);

module.exports = searchRoutes;
