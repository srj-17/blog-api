const jwt = require("jsonwebtoken");
const CustomServerError = require("../customErrors/CustomServerError");
const prisma = require("../models");
const bcrypt = require("bcryptjs");
const ValidationError = require("../customErrors/ValidationError");

async function postLogin(req, res, next) {
    const { email, password } = req.body;
    let user = null;

    try {
        user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new Error("No user with that username");
        }

        const hash = user.password_hash;
        const match = await bcrypt.compare(password, hash);

        if (!match) {
            throw new Error("Incorrect Password");
        }
    } catch (e) {
        console.error(e);
        throw new ValidationError(e.message);
    }

    // token creation
    const { id } = user;
    const userToken = {
        id,
        email,
    };

    jwt.sign(
        { user: userToken },
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
}

module.exports = {
    postLogin,
};
