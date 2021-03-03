const express = require("express");

const sessionController = require("../controllers/session");

const sessionRouter = express.Router();

sessionRouter.post("", sessionController.createSession);
sessionRouter.get("", sessionController.getSession);
sessionRouter.delete("", sessionController.deleteSession);

module.exports = sessionRouter;
