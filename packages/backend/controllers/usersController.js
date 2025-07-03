const bcrypt = require("bcryptjs");
const prisma = require("../models");
const jwt = require("jsonwebtoken");
const CustomNotFoundError = require("../customErrors/CustomNotFoundError");
const MisformedRequestError = require("../customErrors/UnprocessableContentError");
const CustomServerError = require("../customErrors/CustomServerError");
const SALT = 10;

async function getUsers(req, res) {
    const users = await prisma.user.findMany();

    res.json(users);
}

// TODO: manage permissions
async function postUsers(req, res) {
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

async function getUser(req, res) {
    const userId = +req.params.userId;

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
    } catch (e) {
        if (e.statusCode === 404) throw new CustomNotFoundError(e.message);
        throw new CustomServerError(
            "Cannot find the user due to some error in the server.",
        );
    }
}

async function putUser(req, res, next) {
    const userId = +req.params.userId;
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

async function deleteUser(req, res, next) {
    const userId = +req.params.userId;
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

module.exports = {
    getUsers,
    postUsers,
    getUser,
    putUser,
    deleteUser,
};
