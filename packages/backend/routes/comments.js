const {Router} = require("express");
const { getComments } = require("../controllers/comments");
const comments = Router();

comments.get("/", getComments)

module.exports = comments;
