var express = require('express');
var router = express.Router();

var adminModel = require('../model/admin.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
    // adminModel.getAdmin();
  res.send('Api admin');
});

module.exports = router;
