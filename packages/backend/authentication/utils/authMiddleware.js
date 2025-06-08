const passport = require("passport");

const jwtAuthenticationMiddleware = passport.authenticate("jwt", {
    session: false,
});

module.exports = {
    jwtAuthenticationMiddleware,
};
