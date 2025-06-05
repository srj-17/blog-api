const {Router} = require("express");
const { getPosts } = require("../controllers/posts");
const posts = Router();

posts.get("/", getPosts)

module.exports = posts;
