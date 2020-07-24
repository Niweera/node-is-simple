const passport = require("passport");

module.exports = () => {
  return passport.authenticate("jwt", { session: false });
};
