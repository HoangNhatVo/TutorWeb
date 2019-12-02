var express = require('express');
var router = express.Router();
const passport = require('passport')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/google',passport.authenticate('google',{
  scope: ['profile','email']
}));

module.exports = router;
