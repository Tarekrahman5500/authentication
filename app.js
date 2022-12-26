import express from 'express';
import path from 'path'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import logger from 'morgan'
import cors from "cors";
require('dotenv/config')
import session from 'express-session'
import { default as connectMongoDBSession} from 'connect-mongodb-session';


// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');
import dbConfig from './config/database'

const port = process.env.PORT || 5000
import indexRouter from './routes/index'
import usersRouter from './routes/users'


const app = express();
const  MongoStore = connectMongoDBSession(session);
//handle cors policy
app.use(cors())
app.options('*', cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

const sessionStore = new MongoStore({ mongooseConnection: dbConfig, collection: 'sessions' });
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


module.exports = app;
