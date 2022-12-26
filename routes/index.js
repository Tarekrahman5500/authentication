import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res ) {
  res.render('index', { title: 'Express' });
});

router.get('/pp', function(req, res) {
 res.send('ppp')
});

module.exports = router;
