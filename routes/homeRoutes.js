export { router };

import express from 'express';

const router = express.Router();

router.route('/');
router.route('/dashboard');
router.route('/blog');
router.route('/signup');
router.route('/signin');
router.route('/logout');
