const {Router} = require("express");
const { getUsers } = require("../controllers/users");
const users = Router();

users.get("/", getUsers)

module.exports = users;
