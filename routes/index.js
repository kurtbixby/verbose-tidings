export { router };

import express from 'express';

import { router as apiRouter } from './api/index.js';
import { router as homeRouter } from './homeRoutes.js';

const router = express.Router();

router.use('/api', apiRouter);
router.use('/', homeRouter);