import mongoose from 'mongoose'
require('dotenv').config();



const conn = process.env.DB_CONNECTION;

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:'authentication'
});

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
});


const User1 = connection.model('User', UserSchema);

// Expose the connection
module.exports = connection;