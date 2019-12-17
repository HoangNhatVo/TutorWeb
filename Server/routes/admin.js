var express = require('express');
var router = express.Router();
const passport = require('passport');

var adminModel = require('../model/admin.model');

/* GET users listing. */
router.post('/lockaccount', function(req, res, next) {
  var idUser = req.body.idUser
  adminModel.LockAccount(idUser)
  .then(r =>{
    res.send('Khóa thành công')
  })
  .catch(err =>{
    console.log(err)
  })
});

router.post('/unlockaccount', function(req, res, next) {
  var idUser = req.body.idUser
  adminModel.UnLockAccount(idUser)
  .then(r =>{
    res.send('Mở khóa thành công')
  })
  .catch(err =>{
    console.log(err)
  })
});



// router.post('/createadmin', passport.authenticate('admin-local-signup', {
//   // failureRedirect: '/failed',
//   // successRedirect: '/success',
//   // failureFlash: true
//   failWithError: true
// }),
// function (req, res) {
//   res.send('Thành công');
// },
// function (err,req, res, next) {
//     if(req.flash){
//     res.send(req.flash('accountMsg'));
//     }
//   }
// );

module.exports = router;
