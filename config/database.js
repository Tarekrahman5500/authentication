import mongoose,{model, Schema} from "mongoose";
import 'dotenv/config'


// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const conn = process.env.DB_CONNECTION;

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})




module.exports = connection;
