const { Router } = require("express");
const {
    getComments,
    postComments,
    getComment,
    putComment,
    deleteComment,
} = require("../controllers/commentsController");
const {
    verifyToken,
} = require("../authentication/utils/verifyTokenMiddelware");
const comments = Router({ mergeParams: true });

comments.get("/", getComments);
comments.post("/", verifyToken, postComments);
comments.get("/:commentId", getComment);
comments.put("/:commentId", verifyToken, putComment);
comments.delete("/:commentId", verifyToken, deleteComment);

module.exports = comments;
