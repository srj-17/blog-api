const { Router } = require("express");
const { postLogin } = require("../controllers/loginController");
const login = Router();

login.post("/", postLogin);

module.exports = login;
