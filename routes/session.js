const express = require("express");
const Joi = require("joi");
const axios = require("axios");

const { logIn } = require("../validations/user");
const { parseError, sessionizeUser } = require("../util/helpers");
const { SWAPI_BASE_URL } = require("../util/constants");

const sessionRouter = express.Router();

sessionRouter.post("", async (req, res) => {
  try {
    const { name, birthYear } = req.body;
    await Joi.validate({ name, birthYear }, logIn);

    const response = await axios.get(SWAPI_BASE_URL + "/people?search=" + name);

    if (!response) {
      // TODO: fix error throw mechanism
      throw new Error("Invalid login credentials");
    }

    const characters = response.data.results;
    if (!characters || characters.length != 1) {
      throw new Error("Invalid login credentials");
    }

    const character = characters[0];
    if (character.birth_year !== birthYear) {
      throw new Error("Invalid login credentials");
    }

    const sessionUser = sessionizeUser({ name, isLoggedIn: true });
    req.session.user = sessionUser;
    req.session.save();
    res.send(sessionUser);
  } catch (err) {
    res.status(401).send(parseError(err));
  }
});

sessionRouter.delete("", ({ session }, res) => {
  try {
    const user = session.user;
    if (user) {
      session.destroy((err) => {
        if (err) throw err;
        res.clearCookie(process.env.SESS_NAME);
        res.send(user);
      });
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    res.status(422).send(parseError(err));
  }
});

sessionRouter.get("", (req, res) => {
  const user = req.session.user;
  res.send({ user });
});

module.exports = sessionRouter;
