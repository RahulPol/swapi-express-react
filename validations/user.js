const Joi = require("joi");

const name = Joi.string().required();
const birthYear = Joi.string().alphanum().required();

exports.logIn = Joi.object().keys({
  name,
  birthYear,
});
