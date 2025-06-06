const {Router} = require("express");
const { getPosts } = require("../controllers/postsController");
const posts = Router();

posts.get("/", getPosts)

module.exports = posts;
