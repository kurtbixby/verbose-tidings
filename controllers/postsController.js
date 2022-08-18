export { getPostsHandler, getAPostHandler, getUserPostsHandler,
    createPostHandler, updatePostHandler,
    getPostCommentsHandler, createPostCommentHandler
};

import { Comment, Post } from '../models/index.js';

function getPostsHandler(req, res) {
    try {
        const posts = await Post.findAll();
        return posts;
    } catch (err) {
        console.error(err);
        res.status(500).res('Internal Server Error');
    }
}

function getAPostHandler(req, res) {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            res.status(400).json({ message: 'No post with that id'});
            return;
        }

        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).res('Internal Server Error');
    }
}

function getUserPostsHandler(req, res) {
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
function createPostHandler(req, res) {
    try {
        const user = User.findByPk(req.session.user_id);

        if (!user) {
            // This should never fire in normal use
            res.status(400).message('Invalid user');
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
function updatePostHandler(req, res) {
    try {
        const post = Post.findByPk(req.params.id);

        if (!post) {
            res.status(400).message('No post with specified id');
        }
        const { title, body } = req.body;
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error');
    }
}

// Must be logged in
function deletePostHandler(req, res) {
    try {

    } catch (err) {

    }
}

function getPostCommentsHandler(req, res) {
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
function createPostCommentHandler(req, res) {
    try {
        const user = User.findByPk(req.session.user_id);

        if (!user) {
            // This should never fire
            res.status(400).message('Invalid user');
        }

        const post = Post.findByPk(req.params.id);

        if (!post) {
            res.status(400).message('No post with specified id');
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
