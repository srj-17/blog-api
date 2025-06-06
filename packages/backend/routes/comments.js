const { Router } = require("express");
const {
    getComments,
    postComments,
    getComment,
    putComment,
    deleteComment,
} = require("../controllers/commentsController");
const comments = Router({ mergeParams: true });

comments.get("/", getComments);
comments.post("/", postComments);
comments.get("/:commentId", getComment);
comments.put("/:commentId", putComment);
comments.delete("/:commentId", deleteComment);

module.exports = comments;
