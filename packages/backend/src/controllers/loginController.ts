import jwt, { type Jwt } from "jsonwebtoken";
import CustomUnauthenticatedError from "../customErrors/CustomUnauthenticatedError.js";
import prisma from "../models/index.js";
import bcrypt from "bcryptjs";
import { type Request, type Response } from "express";
import { jwtDecode } from "jwt-decode";

interface Payload {
    id: number;
    email: string;
    name: string;
}

function createJwt(payload: Payload): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { user: payload },
            process.env.JWT_SECRET,
            { expiresIn: "30 days" },
            (err, token) => {
                if (err) {
                    console.error(err);
                    reject(
                        new CustomUnauthenticatedError(
                            "Token could not be created.",
                        ),
                    );
                }

                resolve(token);
            },
        );
    });
}

async function postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    let user = null;

    try {
        user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new Error("No user with that username");
        }

        const hash = user.password_hash;
        const match = await bcrypt.compare(password, hash);

        if (!match) {
            throw new Error("Incorrect Password");
        }
    } catch (e: any) {
        console.error(e);
        throw new CustomUnauthenticatedError(e.message);
    }

    // token creation
    const { id } = user;
    const userPayload = {
        id,
        email,
        name: `${user.firstName} ${user.lastName}`,
    };

    try {
        const jwtToken = await createJwt(userPayload);
        return res.json({
            token: jwtToken,
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
}

async function redirectToGoogleLoginPage(req: Request, res: Response) {
    const rootUrl = "https://accounts.google.com/o/oauth2/auth";
    const options = {
        client_id: process.env.CLIENT_ID,
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
        prompt: "consent", // show consent screen each time, else shows it jus the first time
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
        access_type: "online", // doesn't return refresh token
        response_type: "code", // what google will return in it's query params
    };

    const queryString = new URLSearchParams(options).toString();
    const url = `${rootUrl}?${queryString}`;

    return res.redirect(url);
}

async function getGoogleOauthRedirect(req: Request, res: Response) {
    try {
        const { code } = req.query;

        const baseUri = "https://oauth2.googleapis.com/token";

        const options = {
            code, // authorization_code

            // client credentials
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,

            // redirect_uri is only for validation by the google
            redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
            grant_type: "authorization_code",
        };

        const queryString = new URLSearchParams(options);
        const url = `${baseUri}?${queryString}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const { id_token, access_token } = await response.json();

        type TokenType = {
            id: string;
            email: string;
            verified_email: boolean;
            name: string;
            given_name: string;
            family_name: string;
            picture: string;
        };
        const {
            given_name: firstName,
            family_name: lastName,
            email,
        } = jwtDecode(id_token) as TokenType;

        const userPayload = {
            id: 1, // TODO: replace this with db id after integrating oauth registration in db
            email,
            name: `${firstName} ${lastName}`,
        };

        const jwtToken = await createJwt(userPayload);
        return res.json({
            token: jwtToken,
        });
    } catch (e: any) {
        console.error(e.message);
        if (e.statusCode === 401 || e.statusCode === 500) {
            throw e;
        }
    }
}

export { postLogin, redirectToGoogleLoginPage, getGoogleOauthRedirect };
