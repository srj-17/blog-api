const { Router } = require("express");
const { getComments } = require("../controllers/commentsController");
const comments = Router();

comments.get("/", getComments);

module.exports = comments;
