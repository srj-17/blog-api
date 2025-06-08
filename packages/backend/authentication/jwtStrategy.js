const { Strategy: JwtStrategy } = require("passport-jwt");
const { ExtractJwt } = require("passport-jwt");
const prisma = require("../models");
const passport = require("passport");

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

async function verifyFunction(jwtPayload, done) {
    try {
        const user = prisma.user.findUnique({
            where: {
                id: jwtPayload.user.id,
            },
        });

        if (!user) {
            done(null, false);
        }

        done(null, user);
    } catch (e) {
        done(e);
    }
}

const strategy = new JwtStrategy(opts, verifyFunction);
passport.use(strategy);
