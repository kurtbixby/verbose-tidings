export { homeHandler, dashboardHandler, blogHandler, signupHandler, postSignupHandler, loginHandler, logoutHandler };
import fetch from 'node-fetch';

import { dateTimeToDateAndTime } from '../util/util.js';

const BASE_URL = 'http://localhost';
const API_PORT = process.env.PORT || 3001;

async function homeHandler(req, res) {
    try {
        const dataEndpoint = '/api/posts';
        const fetchUrl = `${BASE_URL}:${API_PORT}${dataEndpoint}`;
        const posts = await (await fetch(fetchUrl)).json();
        posts.forEach((e, idx) => {
            const dateTime = dateTimeToDateAndTime(e.createdAt);
            posts[idx].date = dateTime.date;
            posts[idx].time = dateTime.time;
        });
        console.log(posts);
        res.render('homepage', {loggedIn: req.session.loggedIn, posts, clickable: true});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function dashboardHandler(req, res) {
    try {
        const dataEndpoint = `/api/posts/users/${req.session.user}`;
        const fetchUrl = `${BASE_URL}:${API_PORT}${dataEndpoint}`;
        const posts = await (await fetch(fetchUrl)).json();
        posts.forEach((e, idx) => {
            const dateTime = dateTimeToDateAndTime(e.createdAt);
            posts[idx].date = dateTime.date;
            posts[idx].time = dateTime.time;
        });
        console.log(posts);
        res.render('dashboard', {loggedIn: req.session.loggedIn, posts});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function blogHandler(req, res) {
    try {
        const dataEndpoint = `/api/posts/${req.params.id}`;
        const fetchUrl = `${BASE_URL}:${API_PORT}${dataEndpoint}`;
        const post = await (await fetch(fetchUrl)).json();
        const dateTime = dateTimeToDateAndTime(post.createdAt);
        post.date = dateTime.date;
        post.time = dateTime.time;

        post.comments.forEach((e, idx) => {
            const dateTime = dateTimeToDateAndTime(e.createdAt);
            post.comments[idx].date = dateTime.date;
            post.comments[idx].time = dateTime.time;
        });

        console.log(post);
        res.render('blogpage', {loggedIn: req.session.loggedIn, post});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function signupHandler(req, res) {
    try {
        res.render('credentialspage', { signup: true});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function postSignupHandler(req, res) {
    try {
        res.render('postsignup');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function loginHandler(req, res) {
    try {
        res.render('credentialspage', { signup: false});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function logoutHandler(req, res) {
    try {
        if (req.session.loggedIn) {
            req.session.user = null;
            req.session.loggedIn = false;
            req.session.save((err) => {
                if (err) next(err);
                req.session.regenerate((err) => {
                    if (err) next(err)
                    res.status(200).cookie('loggedIn', false).redirect('/');
                });
            })
        } else {
            res.status(400).redirect('/');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err).redirect('/');
    }
}
