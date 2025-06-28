const BadRequestError = require("../customErrors/BadRequestError");
const CustomNotFoundError = require("../customErrors/CustomNotFoundError");
const UnprocessableContentError = require("../customErrors/UnprocessableContentError");
const prisma = require("../models");

// returns all posts in descending order
// when author is not provided, sends all
// posts of author if author provided
async function getPosts(req, res) {
    const authorId = +req.params.userId;
    if (!authorId) {
        const posts = await prisma.post.findMany({
            orderBy: {
                publishedAt: "desc",
            },
        });

        return res.json(posts);
    }

    const posts = await prisma.post.findMany({
        where: {
            authorId: authorId,
        },
    });
    res.json(posts);
}

async function postPosts(req, res) {
    const title = req.body.title;
    const content = req.body.content;

    // req.body.published is "1" or "0"
    const published = Boolean(+req.body.published) || false;

    const authorId = +req.params.userId;
    const createdAt = new Date();
    const publishedAt = new Date();

    if (!authorId) {
        throw new BadRequestError();
    }

    if (!(title && content)) {
        throw new UnprocessableContentError(
            "Values of all required fields not provided!",
        );
    }

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

    const title = req.body.title;
    const content = req.body.content;
    const published = Boolean(+req.body.published) || false;

    if (!(title && content)) {
        throw new UnprocessableContentError(
            "Values of all required fields not provided!",
        );
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
