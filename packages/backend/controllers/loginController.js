const passport = require("passport");

const postLogin = passport.authenticate("local", {
    successRedirect: "/login",
    failureRedirect: "/login",
});

function getLogin(req, res, next) {
    console.log("hello, from login");
    if (!req.isAuthenticated()) {
        return res.json({ msg: "Not Logged in!" });
    }
    res.json({ msg: "Logged in successfully!" });
}

module.exports = {
    postLogin,
    getLogin,
};
