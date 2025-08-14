import { Router } from "express";
import { getComments, postComments, getComment, putComment, deleteComment, } from "../controllers/commentsController.js";
import { verifyToken } from "../authentication/utils/verifyTokenMiddelware.js";
const comments = Router({ mergeParams: true });
comments.get("/", getComments);
comments.post("/", verifyToken, postComments);
comments.get("/:commentId", getComment);
comments.put("/:commentId", verifyToken, putComment);
comments.delete("/:commentId", verifyToken, deleteComment);
export default comments;
//# sourceMappingURL=comments.js.map