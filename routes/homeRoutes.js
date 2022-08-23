export { router };

import express from 'express';

import { homeHandler, dashboardHandler, blogHandler, signupHandler, postSignupHandler, loginHandler, logoutHandler } from '../controllers/homeController.js';

import { isAuthenticated } from '../util/auth.js';

const router = express.Router();

router.route('/').get(homeHandler);
router.route('/dashboard').get(isAuthenticated, dashboardHandler);
router.route('/posts/:id').get(blogHandler);
router.route('/signup').get(signupHandler);
router.route('/postsignup').get(postSignupHandler);
router.route('/login').get(loginHandler);
router.route('/logout').get(logoutHandler);
