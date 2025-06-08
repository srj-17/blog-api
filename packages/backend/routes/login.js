const { Router } = require("express");
const { postLogin, getLogin } = require("../controllers/loginController");
const login = Router();

login.post("/", postLogin);
login.get("/", getLogin);

module.exports = login;
