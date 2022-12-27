import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local';

import connection from './database'
const User = connection.models.User

