export { router };

import express from 'express';
import { loginHandler, signupHandler, logoutHandler } from '../../controllers/authController.js';

const router = express.Router();

// POST /login
// POST /signup
router.route('/login').post(loginHandler);
router.route('/signup').post(signupHandler);