exports.parseError = (err) => {
  if (err.isJoi) return err.details[0];
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
};

exports.sessionizeUser = (user) => {
  // TODO: can we get away with isLoggedIn flag as its redundant
  return { username: user.name, isLoggedIn: user.isLoggedIn };
};
