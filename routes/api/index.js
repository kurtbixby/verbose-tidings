export { router };

import express from 'express';

import { router as authRouter } from './authRoutes.js';
import { router as postsRouter } from './postsRoutes.js';

const router = express.Router();

router.use('/posts', postsRouter);
router.use('/', authRouter);
