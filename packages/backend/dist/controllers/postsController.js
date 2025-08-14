import CustomNotFoundError from "../customErrors/CustomNotFoundError.js";
import UnprocessableContentError from "../customErrors/UnprocessableContentError.js";
import CustomServerError from "../customErrors/CustomServerError.js";
import CustomForbiddenError from "../customErrors/CustomForbiddenError.js";
import prisma from "../models/index.js";
import {} from "express";
import BadRequestError from "../customErrors/BadRequestError.js";
async function getAllPosts(req, res) {
    const authorId = req.params.userId ? +req.params.userId : null;
    const { searchQuery, limit } = req.query;
    if (!authorId) {
        throw new BadRequestError("No authorid provided in the request");
    }
    // TODO: add good typing here
    let findManyOptions = {
        orderBy: {
            publishedAt: "desc",
        },
        where: {
            published: true,
        },
    };
    if (searchQuery) {
        findManyOptions.where = {
            title: {
                contains: searchQuery,
                mode: "insensitive",
            },
        };
    }
    if (limit) {
        findManyOptions.take = +limit;
    }
    if (authorId) {
        findManyOptions.where = {
            authorId: authorId,
        };
    }
    try {
        const posts = await prisma.post.findMany(findManyOptions);
        return res.json(posts);
    }
    catch (e) {
        console.error(e);
        throw new CustomServerError("Cannot get the posts because of some error in the server.");
    }
}
// returns all posts in descending order
// when author is not provided, sends all
// posts of author if author provided
// limit = number of posts the frontend is asking for
async function getPosts(req, res) {
    const { searchQuery, limit } = req.query;
    const token = req.token;
    // TODO: add solid typing here
    let findManyOptions = {
        orderBy: {
            publishedAt: "desc",
        },
    };
    if (token) {
        findManyOptions.where = {
            authorId: token.user.id,
        };
    }
    else {
        throw new CustomForbiddenError();
    }
    if (searchQuery) {
        findManyOptions.where = {
            title: {
                contains: searchQuery,
                mode: "insensitive",
            },
        };
    }
    if (limit) {
        findManyOptions.take = +limit;
    }
    try {
        const posts = await prisma.post.findMany(findManyOptions);
        return res.json(posts);
    }
    catch (e) {
        console.error(e);
        throw new CustomServerError("Cannot get the posts because of some error in the server.");
    }
}
async function postPosts(req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const published = Boolean(req.body.published);
    const authorId = req.token.user.id;
    const createdAt = new Date();
    const publishedAt = new Date();
    if (!(title && content)) {
        throw new UnprocessableContentError("Values of all required fields not provided!");
    }
    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                createdAt,
                publishedAt,
                published,
                authorId,
            },
        });
        res.json(post);
    }
    catch (e) {
        console.error(e);
        throw new CustomServerError("Cannot create the post because of some error in the server.");
    }
}
async function getPost(req, res) {
    const postId = req.params.postId ? +req.params.postId : null;
    const { include } = req.query;
    if (!postId) {
        throw new BadRequestError("Postid not provided in the request");
    }
    // TODO: add proper typing
    let inclusionOptions = { author: true };
    if (include === "comments") {
        inclusionOptions.comments = {
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
            orderBy: {
                createdDate: "desc",
            },
        };
    }
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: inclusionOptions,
        });
        if (!post) {
            throw new CustomNotFoundError("Post not found");
        }
        res.json(post);
    }
    catch (e) {
        console.error(e);
        if (e.statusCode === 404) {
            throw new CustomNotFoundError();
        }
        throw new CustomServerError("Cannot get the post because of some error in the server.");
    }
}
async function putPost(req, res) {
    const postId = req.params.postId ? +req.params.postId : null;
    if (!postId) {
        throw new BadRequestError("Postid not provided in the request");
    }
    const title = req.body.title;
    const content = req.body.content;
    const published = Boolean(+req.body.published) || false;
    if (!(title && content)) {
        throw new UnprocessableContentError("Values of all required fields not provided!");
    }
    try {
        const post = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                title,
                content,
                published,
                publishedAt: published ? new Date() : null,
            },
        });
        res.json(post);
    }
    catch (e) {
        console.error(e);
        throw new CustomNotFoundError("Post not found");
    }
}
async function deletePost(req, res) {
    const postId = req.params.postId ? +req.params.postId : null;
    if (!postId) {
        throw new BadRequestError("Postid not provided in the request");
    }
    try {
        const post = await prisma.post.delete({
            where: {
                id: postId,
            },
        });
        res.json(post);
    }
    catch (e) {
        throw new CustomNotFoundError("Post not found");
    }
}
export { getPosts, postPosts, getPost, putPost, deletePost, getAllPosts };
//# sourceMappingURL=postsController.js.map