import { Router } from "express";
import { postLogin } from "../controllers/loginController.js";
const login = Router();
login.post("/", postLogin);
export default login;
//# sourceMappingURL=login.js.map