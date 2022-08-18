export { router };

import express from 'express';

import { homeHandler, dashboardHandler, blogHandler, signupHandler, signinHandler, logoutHandler } from '../controllers/homeController.js';

const router = express.Router();

router.route('/').get(homeHandler);
router.route('/dashboard').get(dashboardHandler);
router.route('/blog').get(blogHandler);
router.route('/signup').get(signupHandler);
router.route('/signin').get(signinHandler);
router.route('/logout').get(logoutHandler);
