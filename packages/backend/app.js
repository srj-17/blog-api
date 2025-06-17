const express = require("express");
const routes = require("./routes");
const { errorHandler404 } = require("./controllers/errorHandler404");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = require("./models");
const passport = require("passport");
const cors = require("cors");

const app = express();

// cors
app.use(cors());

// parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
