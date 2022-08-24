export { getPostsHandler, getAPostHandler, getUserPostsHandler,
    createPostHandler, updatePostHandler, deletePostHandler,
    getPostCommentsHandler, createPostCommentHandler
};

import { Comment, Post, User } from '../models/index.js';

async function getPostsHandler(req, res) {
    try {
        const posts = await Post.findAll({
            attributes: {
                exclude: ['userId', 'updatedAt']
            },
            include: {
                model: User,
                attributes: {
                    exclude: ['email', 'password']
                }
            },
        });
        console.log(posts);
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).res('Internal Server Error');
    }
}

async function getAPostHandler(req, res) {
    try {
        const post = await Post.findByPk(req.params.id, {
            attributes: {
                exclude: ['userId', 'updatedAt']
            },
            include: [{
                model: User,
                attributes: {
                    exclude: ['email', 'password']
                }
            },
            {
                model: Comment,
                attributes: {
                    exclude: ['userId', 'postId', 'updatedAt']
                },
                include: {
                    model: User,
                    attributes: {
                        exclude: ['email', 'password']
                    }
                }
            }],
        });

        if (!post) {
            res.status(400).json({ message: 'No post with that id'});
            return;
        }

        console.log(post);
        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).res('Internal Server Error');
    }
}

async function getUserPostsHandler(req, res) {
    try {
        const userPosts = await Post.findAll({
            where: {
                userId: req.params.userId
            }
        });

        res.status(200).json(userPosts);
    } catch (err) {
        console.error(err);
        res.status(500).res('Internal Server Error');
    }
}

// Must be logged in
async function createPostHandler(req, res) {
    try {
        const user = User.findByPk(req.session.user_id);

        if (!user) {
            // This should never fire in normal use
            res.status(400).json({message: 'Invalid user'});
            return;
        }

        const { title, body } = req.body;
        const newPost = Comment.create(title, body);

        res.status(200).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).res('Internal Server Error');
    }
}

// Must be logged in
async function updatePostHandler(req, res) {
    try {
        const { title, body } = req.body;

        const post = await Post.update({title, body}, {
            where: {
                id: req.params.id
            }
        });

        console.log(post);

        if (!post[0]) {
            res.status(400).json({message: 'No post with specified id'});
            return;
        }

        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error');
    }
}

// Must be logged in
async function deletePostHandler(req, res) {
    try {
        const post = await Post.destroy({
            where: {
                id: req.params.id
            }
        });

        console.log(post);

        if (!post[0]) {
            res.status(400).json({message: 'No post with specified id'});
            return;
        }

        res.status(200).json(post);
    } catch (err) {

    }
}

async function getPostCommentsHandler(req, res) {
    try {
        const comments = Comment.findAll({
            where: {
                postId: req.params.id
            }
        });

        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).res('Internal Server Error');
    }
}

// Must be logged in
async function createPostCommentHandler(req, res) {
    try {
        const user = User.findByPk(req.session.user_id);

        if (!user) {
            // This should never fire
            res.status(400).json({message: 'Invalid user'});
            return;
        }

        const post = Post.findByPk(req.params.id);

        if (!post) {
            res.status(400).json({message: 'No post with specified id'});
            return;
        }

        const { title, body } = req.body;
        const newComment = Comment.create(title, body);
        newComment.setPost(post);
        newComment.setUser(user);

        res.status(200).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).res('Internal Server Error');
    }
}
