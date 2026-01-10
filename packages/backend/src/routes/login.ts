import { Router } from "express";
import { getGoogleOauthRedirect, postLogin, redirectToGoogleLoginPage } from "../controllers/loginController.js";
const login = Router();

login.post("/", postLogin);
login.get("/oauth", redirectToGoogleLoginPage)
login.get("/oauth/redirectUrl", getGoogleOauthRedirect)

export default login;
