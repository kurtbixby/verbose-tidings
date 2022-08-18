export { homeHandler, dashboardHandler, blogHandler, signupHandler, signinHandler, logoutHandler };
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost';
const API_PORT = process.env.PORT || 3001;

async function homeHandler(req, res) {
    try {
        res.render('homepage');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function dashboardHandler(req, res) {
    try {
        res.render('dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function blogHandler(req, res) {
    try {
        res.render('blogpage');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function signupHandler(req, res) {
    try {
        res.render('credentialspage');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function signinHandler(req, res) {
    try {
        res.render('credentialspage');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function logoutHandler(req, res) {
    try {
        
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
