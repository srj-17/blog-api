import BadRequestError from "../customErrors/BadRequestError.js";
import CustomNotFoundError from "../customErrors/CustomNotFoundError.js";
import UnprocessableContentError from "../customErrors/UnprocessableContentError.js";
import CustomServerError from "../customErrors/CustomServerError.js";
import prisma from "../models/index.js";
import {} from "express";
async function getComments(req, res) {
    try {
        const postId = req.params.postId ? +req.params.postId : null;
        if (!postId) {
            throw new BadRequestError("No postId provided!");
        }
        const comments = await prisma.comment.findMany({
            where: {
                postId: postId,
            },
            orderBy: {
                createdDate: "desc",
            },
            select: {
                id: true,
                content: true,
                postId: true,
                author: {
                    select: {
                        email: true,
                    },
                },
            },
        });
        res.json(comments);
    }
    catch (e) {
        console.error(e);
        throw new CustomServerError("Cannot get the comments because of error in the server.");
    }
}
async function postComments(req, res) {
    const authorId = req.token.user.id;
    const postId = req.params.postId ? +req.params.postId : null;
    const content = req.body.content;
    if (!postId) {
        throw new BadRequestError("PostId not provided in the request!");
    }
    if (!authorId) {
        throw new BadRequestError("Comment must come from author. Author not provided!");
    }
    if (!content) {
        throw new UnprocessableContentError("All required fields not provided");
    }
    try {
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
    catch (e) {
        console.error(e);
        throw new CustomServerError("Cannot post the comment because of error in the server.");
    }
}
async function getComment(req, res) {
    const commentId = req.params.commentId ? +req.params.commentId : null;
    if (!commentId) {
        throw new BadRequestError("Comment id is not provided!");
    }
    try {
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
    catch (e) {
        console.error(e);
        if (e.statusCode === 404) {
            throw new CustomNotFoundError(e.message);
        }
        throw new CustomServerError("Cannot get the comment because of the error in the server.");
    }
}
async function putComment(req, res) {
    const commentId = req.params.commentId ? +req.params.commentId : null;
    if (!commentId) {
        throw new BadRequestError("No comment Id provided!");
    }
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
    }
    catch (e) {
        console.error(e);
        throw new CustomNotFoundError("User not found");
    }
}
async function deleteComment(req, res) {
    const commentId = req.params.commentId ? +req.params.commentId : null;
    if (!commentId) {
        throw new BadRequestError("No comment Id provided!");
    }
    try {
        const comment = await prisma.comment.delete({
            where: {
                id: commentId,
            },
        });
        return res.json(comment);
    }
    catch (e) {
        console.error(e);
        throw new CustomNotFoundError("Comment could not be deleted!");
    }
}
export { getComments, postComments, getComment, putComment, deleteComment };
//# sourceMappingURL=commentsController.js.map