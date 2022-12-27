import express from 'express';

const router = express.Router();
import connection from '../config/database'
import genPassword from '../lib/passwordUtils'

const User = connection.models.User
/* GET home page. */
router.get('/', async (req, res, next) => {
    res.send(`<h1>Home</h1><p>Please <a href="/register">Register</a></p>`)
});

router.get('/login', async (req, res, next) => {
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
})

router.get('/register', async (req, res, next) => {
    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
})

router.get('/admin', async (req, res, next) => {
    if (req.isAuthenticated) {
        res.send('<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>');
    } else {
        res.send('<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>');
    }
})

router.get('/logout', async (req, res, next) => {
    req.logout();
    res.redirect('/admin')
})

router.get('/login-success', async (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
})

router.get('/login-failure', async (req, res, next) => {
    res.send('You entered the wrong password.');
})
router.post('/login', async (req, res, next) => {

})

router.post('/register', async (req, res, next) => {

})

module.exports = router;
