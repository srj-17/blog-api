const { Router } = require("express");
const {
    getUsers,
    postUsers,
    getUser,
    putUser,
    deleteUser,
} = require("../controllers/usersController");
const users = Router();

users.get("/", getUsers);
users.post("/", postUsers);
users.get("/:userId", getUser);
users.put("/:userId", putUser);
users.delete("/:userId", deleteUser);

module.exports = users;
