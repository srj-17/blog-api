const CustomNotFoundError = require("../customErrors/CustomNotFoundError");
const prisma = require("../models");

async function getComments(req, res) {
    const authorId = +req.params.userId;
    const postId = +req.params.postId;

    const comments = await prisma.comment.findMany({
        where: {
            authorId: authorId,
            postId: postId,
        },
    });

    res.json(comments);
}

async function postComments(req, res) {
    const authorId = +req.params.userId;
    const postId = +req.params.postId;

    // dummy data
    const title = "Some title";
    const content = "Content of the commment";

    const comment = await prisma.comment.create({
        data: {
            title,
            content,
            authorId,
            postId,
        },
    });

    res.json(comment);
}

async function getComment(req, res) {
    const commentId = +req.params.commentId;
    const comment = await prisma.comment.findUnique({
        where: {
            id: commentId,
        },
    });

    if (!comment) {
        throw new CustomNotFoundError("Comment not found");
    }

    res.json(comment);
}

async function putComment(req, res, next) {
    const commentId = +req.params.commentId;

    const title = "New title";
    const content = "New content of the commment";

    try {
        const comment = await prisma.comment.update({
            where: {
                id: commentId,
            },
            data: {
                title,
                content,
            },
        });

        return res.json(comment);
    } catch (e) {
        throw new CustomNotFoundError("User not found");
    }
}

async function deleteComment(req, res, next) {
    const commentId = +req.params.commentId;
    try {
        const comment = await prisma.comment.delete({
            where: {
                id: commentId,
            },
        });

        return res.json(comment);
    } catch (e) {
        throw new CustomNotFoundError("Comment not found");
    }
}

module.exports = {
    getComments,
    postComments,
    getComment,
    putComment,
    deleteComment,
};
