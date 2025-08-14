import bcrypt from "bcryptjs";
import prisma from "../models/index.js";
import CustomNotFoundError from "../customErrors/CustomNotFoundError.js";
import MisformedRequestError from "../customErrors/UnprocessableContentError.js";
import CustomServerError from "../customErrors/CustomServerError.js";
import { type Request, type Response } from "express";
import BadRequestError from "../customErrors/BadRequestError.js";
const SALT = 10;

async function getUsers(req: Request, res: Response) {
    const users = await prisma.user.findMany();

    res.json(users);
}

// TODO: manage permissions
async function postUsers(req: Request, res: Response) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const password_hash = await bcrypt.hash(password, SALT);

    if (!(firstName && lastName && email && password)) {
        throw new MisformedRequestError(
            "Values of all required fields not provided!",
        );
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        // TODO: test in frontend for this use case
        if (user) {
            return res.json({ msg: "User with that email already exists" });
        }

        const createdUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password_hash,
            },
        });

        res.json(createdUser);
    } catch (e) {
        console.error(e);
        throw new CustomServerError(
            "Cannot create the user due to some error in the server.",
        );
    }
}

async function getUser(req: Request & { token: { user: any } }, res: Response) {
    const userId = req.params.userId ? +req.params.userId : null;

    if (!userId) {
        // no need to check for authentication again, because
        // we wouldn't reach here without jwt validation
        return res.json(req.token.user);
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                posts: true,
            },
        });

        if (!user) {
            throw new CustomNotFoundError("User not found");
        }

        return res.json(user);
    } catch (e: any) {
        if (e.statusCode === 404) throw new CustomNotFoundError(e.message);
        throw new CustomServerError(
            "Cannot find the user due to some error in the server.",
        );
    }
}

async function putUser(req: Request, res: Response) {
    const userId = req.params.userId ? +req.params.userId : null;

    if (!userId) {
        throw new BadRequestError("UserId not provided in the request");
    }

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const password_hash = await bcrypt.hash(password, SALT);

    if (!(firstName && lastName && email && password)) {
        throw new MisformedRequestError(
            "Values of all required fields not provided!",
        );
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                firstName,
                lastName,
                email,
                password_hash,
            },
        });

        return res.json(user);
    } catch (e) {
        throw new CustomNotFoundError("User not found");
    }
}

async function deleteUser(req: Request, res: Response) {
    const userId = req.params.userId ? +req.params.userId : null;

    if (!userId) {
        throw new BadRequestError("UserId not provided in the request");
    }

    try {
        const user = await prisma.user.delete({
            where: {
                id: userId,
            },
        });

        return res.json(user);
    } catch (e) {
        throw new CustomNotFoundError("User not found");
    }
}

export { getUsers, postUsers, getUser, putUser, deleteUser };
