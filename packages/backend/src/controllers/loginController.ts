import jwt from "jsonwebtoken";
import CustomUnauthenticatedError from "../customErrors/CustomUnauthenticatedError.js";
import prisma from "../models/index.js";
import bcrypt from "bcryptjs";
import { type Request, type Response } from "express";

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
    const userToken = {
        id,
        email,
        name: `${user.firstName} ${user.lastName}`,
    };

    jwt.sign(
        { user: userToken },
        process.env.JWT_SECRET,
        { expiresIn: "30 days" },
        (err, token) => {
            if (err) {
                console.error(err);
                throw new CustomUnauthenticatedError(
                    "Token could not be created.",
                );
            }

            res.json({
                token: token,
            });
        },
    );
}

export { postLogin };
