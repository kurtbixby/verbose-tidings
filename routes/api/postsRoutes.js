export { router };

import express from 'express';

import { getPostsHandler, getAPostHandler,
    createPostHandler, updatePostHandler,
    getPostCommentsHandler, createPostCommentHandler } from '../../controllers/postsController.js';

const router = express.Router();

// GET /
// POST /
// UPDATE /
router.route('/').get(getPostsHandler).post(createPostHandler).put(updatePostHandler);

// GET /id
router.route('/:id').get(getAPostHandler);

// GET /id/comments
// POST /id/comments
router.route('/:id/comments').get(getPostCommentsHandler).post(createPostCommentHandler);