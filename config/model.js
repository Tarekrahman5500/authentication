import {model, Schema} from "mongoose";

const UserSchema = new Schema({
    username: String,
    hash: String,
    salt: String
});


module.exports  = model('User', UserSchema);