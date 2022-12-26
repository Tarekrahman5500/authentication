import express from 'express';
const router = express.Router();
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
/* GET users listing. */

const middleware1 = async (req, res, next) => {

  console.log('middleware1')
  req.customProperties = 100
  next();
}

const middleware2 = async (req, res, next) => {

  console.log(`middleware2: ${req.customProperties}`)
  let errObj = null
   //errObj = new Error('I am an  error')
  req.customProperties = 600
  next(errObj);
}

const errorHandler = async (err,req, res, next) => {
  if (err) {
    console.error(err)
       res.json({err, info: `<h1> There an error occurred</h1>`})
  } else next();
}
router.use(middleware1)
router.use(middleware2)

router.get('/', (req, res, next)  => {
  res.send(`<h1>Hi: ${req.customProperties}</h1>`)
});

router.use(errorHandler)
module.exports = router;
