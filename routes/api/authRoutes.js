export { router };

import express from 'express';

const router = express.Router();

// POST /login
// POST /signup
router.route('/login').post();
router.route('/signup').post();