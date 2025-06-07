const bcrypt = require("bcryptjs");
const prisma = require("../models");
const CustomNotFoundError = require("../customErrors/CustomNotFoundError");
const MisformedRequestError = require("../customErrors/UnprocessableContentError");
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

    const createdUser = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password_hash,
        },
    });

    res.json(createdUser);
}

async function getUser(req, res) {
    const userId = +req.params.userId;

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new CustomNotFoundError("User not found");
    }

    res.json(user);
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
