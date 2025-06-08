const passport = require("passport");
const LocalStragety = require("passport-local").Strategy;
const prisma = require("../models");
const bcrypt = require("bcryptjs");

const customFields = {
    usernameField: "email",
    passwordField: "password",
};

async function verifyCallback(email, password, done) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return done(null, false, { msg: "No user of such username" });
        }

        const hash = user.password_hash;
        const match = await bcrypt.compare(password, hash);

        if (!match) {
            return done(null, false, { msg: "Incorrect password" });
        }

        return done(null, user);
    } catch (e) {
        done(e);
    }
}

const strategy = new LocalStragety(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        return done(null, user);
    } catch (e) {
        done(e);
    }
});
