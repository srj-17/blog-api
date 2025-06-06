const express = require("express");
const routes = require("./routes");
const { errorHandler404 } = require("./controllers/errorHandler404");

const app = express();

// dummy authenticated user
app.use((req, res, next) => {
    req.user = {
        id: 1,
    };

    req.isAuthenticated = () => true;

    next();
});

// parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/users/:userId/posts/:postId/comments", routes.comments);
app.use("/users/:userId/posts", routes.posts);
app.use("/users", routes.users);

app.use(errorHandler404);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({ msg: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
