import postRouter from "./posts.js";
import { Router } from "express";
import { getUsers, postUsers, getUser, putUser, deleteUser, } from "../controllers/usersController.js";
import { verifyToken } from "../authentication/utils/verifyTokenMiddelware.js";
const users = Router({ mergeParams: true });
users.get("/all", getUsers);
users.post("/", postUsers);
users.get("/{:userId}", verifyToken, getUser);
users.put("/:userId", putUser);
users.delete("/:userId", deleteUser);
users.use("/:userId/posts", postRouter);
export default users;
//# sourceMappingURL=users.js.map