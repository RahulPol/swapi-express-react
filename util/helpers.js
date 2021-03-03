const constants = require("./constants");

exports.parseError = (err) => {
  err.status = err.status ? err.status : constants.HTTP_EXCEPTION;
  if (err.isJoi) return err.details[0];
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
};

exports.sessionizeUser = (user) => {
  // TODO: can we get away with isLoggedIn flag as its redundant
  return { username: user.name, isLoggedIn: user.isLoggedIn };
};
