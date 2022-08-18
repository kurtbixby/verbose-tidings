export { router };

import express from 'express';

import { getPostsHandler, getAPostHandler, getUserPostsHandler,
    createPostHandler, updatePostHandler, deletePostHandler,
    getPostCommentsHandler, createPostCommentHandler } from '../../controllers/postsController.js';

const router = express.Router();

// GET /
// POST /
// UPDATE /
router.route('/').get(getPostsHandler).post(createPostHandler).put(updatePostHandler).delete(deletePostHandler);

// GET /id
router.route('/:id').get(getAPostHandler);

// GET /id/comments
// POST /id/comments
router.route('/:id/comments').get(getPostCommentsHandler).post(createPostCommentHandler);

router.route('/user/:userId').get(getUserPostsHandler);
