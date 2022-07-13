// Imports

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';

// Database
import './database';

// Routes
import { routes } from './routes';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.set("trust proxy", 1);
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
        cookie: {
            sameSite: "lax",
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
            httpOnly: true,
        }
    })
);

app.use(routes);

app.listen(process.env.SEQUELIZE_CONNECTION_PORT, () => console.log(`Express server has started on port ${process.env.SEQUELIZE_CONNECTION_PORT}. Open http://localhost:${process.env.SEQUELIZE_CONNECTION_PORT}/ to see results`));