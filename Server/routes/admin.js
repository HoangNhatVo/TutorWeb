var express = require('express');
var router = express.Router();
const passport = require('passport');

var adminModel = require('../model/admin.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
    // adminModel.getAdmin();
  res.send('Api admin');
});



router.post('/createadmin', passport.authenticate('admin-local-signup', {
  failureRedirect: '/failed',
  successRedirect: '/success',
  failureFlash: true
}),
  function (req, res) {}
);

module.exports = router;
