export { router };

import express from 'express';

import { router as apiRouter } from './apiRoutes.js';
import { router as homeRouter } from './homeRoutes.js';

const router = express.Router();

router.use('/api', apiRouter);
router.use('/', homeRouter);