const BadRequestError = require("../customErrors/BadRequestError");
const CustomNotFoundError = require("../customErrors/CustomNotFoundError");
const UnprocessableContentError = require("../customErrors/UnprocessableContentError");
const prisma = require("../models");

async function getComments(req, res) {
    const postId = +req.params.postId;

    const comments = await prisma.comment.findMany({
        where: {
            postId: postId,
        },
        orderBy: {
            createdDate: "desc",
        },
        select: {
            content: true,
            author: {
                select: {
                    email: true,
                },
            },
        },
    });

    res.json(comments);
}

async function postComments(req, res) {
    const authorId = req.token.user.id;
    const postId = +req.params.postId;

    const content = req.body.content;

    if (!authorId) {
        throw new BadRequestError(
            "Comment must come from author. Author not provided!",
        );
    }

    if (!content) {
        throw new UnprocessableContentError("All required fields not provided");
    }

    const comment = await prisma.comment.create({
        data: {
            content,
            authorId,
            postId,
            createdDate: new Date(),
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

    const content = req.body.content;

    if (!content) {
        throw new UnprocessableContentError("All required fields not provided");
    }

    try {
        const comment = await prisma.comment.update({
            where: {
                id: commentId,
            },
            data: {
                content,
                createdDate: new Date(),
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
