const BadRequestError = require("../customErrors/BadRequestError");
const CustomNotFoundError = require("../customErrors/CustomNotFoundError");
const UnprocessableContentError = require("../customErrors/UnprocessableContentError");
const prisma = require("../models");

// returns all posts in descending order
// when author is not provided, sends all
// posts of author if author provided
async function getPosts(req, res) {
    const authorId = +req.params.userId;
    const { searchQuery } = req.query;

    let findManyOptions = {
        orderBy: {
            publishedAt: "desc",
        },
    };

    if (!authorId && !searchQuery) {
        const posts = await prisma.post.findMany(findManyOptions);
        res.json(posts);
    }

    if (!authorId) {
        if (searchQuery) {
            findManyOptions.where = {
                title: {
                    contains: searchQuery,
                },
            };
        }

        const posts = await prisma.post.findMany(findManyOptions);

        return res.json(posts);
    }

    if (!searchQuery) {
        findManyOptions.where = {
            authorId: authorId,
        };

        const posts = await prisma.post.findMany(findManyOptions);
        res.json(posts);
    }

    findManyOptions.where = {
        title: {
            contains: searchQuery,
        },
        authorId: authorId,
    };

    const posts = await prisma.post.findMany(findManyOptions);
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
    const { include } = req.query;
    let inclusionOptions = { author: true };

    if (include === "comments") {
        inclusionOptions.comments = {
            select: {
                content: true,
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
