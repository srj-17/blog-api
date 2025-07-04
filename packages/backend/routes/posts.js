const commentsRouter = require("./comments");
const { Router } = require("express");
const {
    getPosts,
    postPosts,
    getPost,
    putPost,
    deletePost,
} = require("../controllers/postsController");
const posts = Router({ mergeParams: true });

posts.get("/", getPosts);
posts.post("/", postPosts);

// you can also include "include=comments" query
// param with this to include additional comments
posts.get("/:postId", getPost);
posts.put("/:postId", putPost);
posts.delete("/:postId", deletePost);
posts.use("/:postId/comments", commentsRouter);

module.exports = posts;
