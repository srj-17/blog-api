const { Router } = require("express");
const {
    getUsers,
    postUsers,
    getUser,
    putUser,
    deleteUser,
} = require("../controllers/usersController");
const {
    jwtAuthenticationMiddleware,
} = require("../authentication/utils/authMiddleware");
const users = Router({ mergeParams: true });

users.get("/", getUsers);
users.post("/", postUsers);
users.get("/:userId", jwtAuthenticationMiddleware, getUser);
users.put("/:userId", putUser);
users.delete("/:userId", deleteUser);

module.exports = users;
