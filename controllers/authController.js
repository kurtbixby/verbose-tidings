export { signupHandler, loginHandler, logoutHandler };

import { ValidationError } from "sequelize";
import { User } from '../models/index.js';

async function signupHandler(req, res) {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({username, email, password});
        res.status(201).json(user);
    } catch (err) {
        if (err instanceof ValidationError) {
            res.status(400).json(err);
        } else {
            console.error(err);
            res.status(500).json(err);
        }
    }
}

async function loginHandler(req, res) {
    try {
        console.log(req.body);
        const user = await User.findOne({ where: { email: req.body.email }});
        console.log(user);

        if (!user) {
            console.error('No user');
            res.status(400).json({ message: 'Incorrect email or password, please try again'});
            return;
        }

        const validPassword = user.checkPassword(req.body.password);

        if (!validPassword) {
            console.error('Invalid password');
            res.status(400).json({ message: 'Incorrect email or password, please try again'});
            return;
        }

        req.session.regenerate((err) => {
            console.log('login regen');
            if (err) next(err);

            req.session.user = user.id;
            req.session.loggedIn = true;
            
            req.session.save((err) => {
                if (err) next(err);
                res.status(200).cookie('loggedIn', true).redirect('/');
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

// Eventually rework code structure to use this backend function instead of the web route
function logoutHandler(req, res) {

}