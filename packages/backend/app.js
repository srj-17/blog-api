const express = require("express");
const routes = require("./routes");
const { errorHandler404 } = require("./controllers/errorHandler404");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = require("./models");
const passport = require("passport");

const app = express();

// parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 2,
            dbRecordIdIsSessionId: true,
            dbRecordIsFunction: undefined,
        }),
        cookie: {
            // 30 days
            maxAge: 30 * 24 * 60 * 60 * 1000,
        },
    }),
);

// authentication
require("./authentication/jwtStrategy");
require("./authentication/localStrategy");
app.use(passport.session());

// routes
app.use("/users/:userId/posts/:postId/comments", routes.comments);
app.use("/users/:userId/posts", routes.posts);
app.use("/users", routes.users);
app.use("/login", routes.login);

app.use(errorHandler404);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({ msg: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
