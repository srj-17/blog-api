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

module.exports = users;
