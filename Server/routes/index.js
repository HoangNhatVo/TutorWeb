var express = require('express');
var router = express.Router();
const passport = require('passport');
var accountModel = require('../model/account.model');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google',
  {
    successRedirect: '/home',
    failureRedirect: '/'
  }))

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['profile', 'email']
}));

router.get('/facebook/callback', passport.authenticate('facebook',
  {
    successRedirect: '/home',
    failureRedirect: '/'
  }))

router.get('/home', function(req, res, next) {
    // adminModel.getAdmin();
  res.send('home');
});

router.post('/login', passport.authenticate('local-login', {
  failureRedirect: '/failed',
  successRedirect: '/loginsuccess',
  failureFlash: true
}),
  function (req, res) {
    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    }
    else {
      req.session.cookie.expires = false;
    }
    res.redirect('/');
  }
);


//router dang ky học sinh
router.post('/studentregister', passport.authenticate('local-signup', {
  failureRedirect: '/failed',
  successRedirect: '/success',
  failureFlash: true
}),
  function (req, res) {}
);

//router dang ky giáo viên
router.post('/teacherregister', passport.authenticate('teacher-local-signup', {
  failureRedirect: '/failed',
  successRedirect: '/success',
  failureFlash: true
}),
  function (req, res) {}
);

router.post('/verify', function(req, res, next){
  console.log(req.body.verify);
  accountModel.getAccountVerify(req.body.verify).then(r=>{
    console.log(r[0]);
    if(r.length){
      accountModel.updateAccountVerify(r[0].id).then(r1=>{
        res.redirect('/success');
      }).catch(err=>{
        console.log(err);
        req.flash('accountMsg', 'Lỗi khi xác thực');
        res.redirect('/failed');
      })
    }
    else{
      req.flash('accountMsg', 'Xác thực không đúng.');
      res.redirect('/failed');
    }
  }).catch(err=>{
    console.log(err);
    req.flash('accountMsg', 'Lỗi khi xác thực');
    res.redirect('/failed');
  })
});

router.get('/failed', function(req, res, next){
  res.send(req.flash('accountMsg'));
});
router.get('/success', function(req, res, next){
  res.send('Thành công');
});
router.get('/loginsuccess', function(req, res, next){
  res.send(req.user);
});

router.get('/chuyennganh', function(req, res, next){
  accountModel.getAllChuyenNganh().then(r=>{
    if(r.length){
      res.send(r);
    }
    else{
      req.flash('accountMsg', 'Không có chuyên ngành nào.');
      res.redirect('/failed');
    }
  }).catch(err=>{
      console.log(err);
      req.flash('accountMsg', 'Lỗi khi xác thực');
      res.redirect('/failed');
  })
});

module.exports = router;
