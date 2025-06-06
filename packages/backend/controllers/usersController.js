const bcrypt = require("bcryptjs");
const prisma = require("../models");
const CustomNotFoundError = require("../customErrors/CustomNotFoundError");
const SALT = 10;

async function getUsers(req, res) {
    const users = await prisma.user.findMany();

    res.json(users);
}

// TODO: manage permissions
async function postUsers(req, res) {
    // dummy user
    const name = "johndoee";
    const email = "johndoee@gmail.com";
    const password_hash = await bcrypt.hash("randompassword", SALT);
    const createdUser = await prisma.user.create({
        data: {
            name,
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
    // dummy data
    const name = "newname";
    const email = "new@gmail.com";
    const password_hash = await bcrypt.hash("newpassword", SALT);

    try {
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name,
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
