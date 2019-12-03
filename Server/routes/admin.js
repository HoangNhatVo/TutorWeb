var express = require('express');
var router = express.Router();
const passport = require('passport');

var adminModel = require('../model/admin.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
    // adminModel.getAdmin();
  res.send('Api admin');
});

//router dang ky
router.post('/register', passport.authenticate('teacher-local-signup', {
  failureRedirect: '/failed',
  successRedirect: '/success',
  failureFlash: true
}),
  function (req, res) {}
);

router.post('/createadmin', passport.authenticate('admin-local-signup', {
  failureRedirect: '/failed',
  successRedirect: '/success',
  failureFlash: true
}),
  function (req, res) {}
);

module.exports = router;
