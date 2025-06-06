const CustomNotFoundError = require("../customErrors/CustomNotFoundError");
const prisma = require("../models");

async function getPosts(req, res) {
    const authorId = +req.params.userId;
    const posts = await prisma.post.findMany({
        where: {
            authorId: authorId,
        },
    });
    res.json(posts);
}

async function postPosts(req, res) {
    // dummy post
    const title = "First Post";
    const content = "Hello, world, this is my first post";
    const createdAt = new Date();
    const publishedAt = new Date();
    const published = false;
    const authorId = +req.params.userId;

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

async function getPost(req, res, next) {
    const postId = +req.params.postId;

    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    });

    if (!post) {
        throw new CustomNotFoundError("Post not found");
    }

    res.json(post);
}

async function putPost(req, res, next) {
    const postId = +req.params.postId;

    // dummy data
    const title = "Edited First Post";
    const content = "Hello, world, this is my edited first post";
    const published = false;

    try {
        const post = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                title,
                content,
                published,
            },
        });

        res.json(post);
    } catch (e) {
        throw new CustomNotFoundError("Post not found");
    }
}

async function deletePost(req, res, next) {
    const postId = +req.params.postId;

    try {
        const post = await prisma.post.delete({
            where: {
                id: postId,
            },
        });

        res.json(post);
    } catch (e) {
        throw new CustomNotFoundError("Post not found");
    }
}

module.exports = {
    getPosts,
    postPosts,
    getPost,
    putPost,
    deletePost,
};
