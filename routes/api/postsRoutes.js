export { router };

import express from 'express';

import { getPostsHandler, getAPostHandler, getUserPostsHandler,
    createPostHandler, updatePostHandler, deletePostHandler,
    getPostCommentsHandler, createPostCommentHandler } from '../../controllers/postsController.js';

import { isAuthenticatedApi } from '../../util/auth.js';

const router = express.Router();

// GET /
router.route('/').get(getPostsHandler).post(isAuthenticatedApi, createPostHandler);

// GET /id
// POST /id
// UPDATE /id
router.route('/:id').get(getAPostHandler).put(isAuthenticatedApi, updatePostHandler).delete(isAuthenticatedApi, deletePostHandler);

// GET /id/comments
// POST /id/comments
router.route('/:id/comments').get(getPostCommentsHandler).post(isAuthenticatedApi, createPostCommentHandler);

router.route('/users/:userId').get(getUserPostsHandler);
