import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';
import { router } from './routes/index.js';

import exphbs from 'express-handlebars';

import session from 'express-session';
import sessionSequelize from 'connect-session-sequelize';

const SequelizeStore = sessionSequelize(session.Store);

import { sequelize } from './config/connection.js';

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Such devastation... This was not my intention...',
    cookie: {
      maxAge: 14 * 24 * 3600 * 1000, // Two weeks
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
};

app.use(session(sess));

const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

sequelize.sync();
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));