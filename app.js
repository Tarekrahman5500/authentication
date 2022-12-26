import express from 'express';
import path from 'path'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import logger from 'morgan'
import cors from "cors";

require('dotenv/config')
import session from 'express-session'
import MongoStore from 'connect-mongo'

// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');
import dbConfig from './config/database'

const port = process.env.PORT || 5000
import indexRouter from './routes/index'
import usersRouter from './routes/users'
import mongoose from "mongoose";


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: dbConfig,
    cookie: {
        maxAge: 1000 * 60 * 60 *24 // one day
    }
}))

app.use(passport.initialize());
app.use(passport.session());





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


module.exports = app;
