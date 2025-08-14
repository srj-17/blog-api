import commentsRouter from "./comments.js";
import { Router } from "express";
import { verifyToken } from "../authentication/utils/verifyTokenMiddelware.js";
import { getPosts, postPosts, getPost, putPost, deletePost, getAllPosts, } from "../controllers/postsController.js";
const posts = Router({ mergeParams: true });
// get all published posts
posts.get("/all", getAllPosts);
// get all posts (published / unpublished)
// of logged in user
posts.get("/", verifyToken, getPosts);
posts.post("/", verifyToken, postPosts);
// get a specific post
// you can also include "include=comments" query
// param with this to include additional comments
posts.get("/:postId", getPost);
posts.put("/:postId", verifyToken, putPost);
posts.delete("/:postId", deletePost);
posts.use("/:postId/comments", commentsRouter);
export default posts;
//# sourceMappingURL=posts.js.map