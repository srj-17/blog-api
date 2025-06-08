const passport = require("passport");
const jwt = require("jsonwebtoken");

const postLogin = passport.authenticate("local", {
    successRedirect: "/login",
    failureRedirect: "/login",
});

function getLogin(req, res, next) {
    console.log("hello, from login");
    if (!req.isAuthenticated()) {
        return res.json({ msg: "Not Logged in!" });
    }

    // token creation
    const { id, email } = req.user;
    const user = {
        id,
        email,
    };

    jwt.sign(
        { user: user },
        process.env.JWT_SECRET,
        { expiresIn: "30 days" },
        (err, token) => {
            if (err) {
                return res.json({ msg: "token couldn't be created" });
            }

            res.json({
                token: token,
            });
        },
    );

    // login message
    // res.json({ msg: "Logged in successfully!" });
}

module.exports = {
    postLogin,
    getLogin,
};
