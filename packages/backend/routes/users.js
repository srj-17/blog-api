const postRouter = require("./posts");
const { Router } = require("express");
const {
    getUsers,
    postUsers,
    getUser,
    putUser,
    deleteUser,
} = require("../controllers/usersController");
const {
    verifyToken,
} = require("../authentication/utils/verifyTokenMiddelware");
const users = Router({ mergeParams: true });

users.get("/all", getUsers);
users.post("/", postUsers);
users.get("/{:userId}", verifyToken, getUser);
users.put("/:userId", putUser);
users.delete("/:userId", deleteUser);
// hasn't been used much
users.use("/:userId/posts", postRouter);

module.exports = users;
