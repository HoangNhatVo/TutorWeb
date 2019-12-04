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
  //failureRedirect: '/failed',
  failWithError: true
  //successRedirect: '',
  //failureFlash: true
}),
  function (req, res) {
    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    }
    else {
      req.session.cookie.expires = false;
    }
    if(req.user.id){
      var arr = new Array();
      arr[0]=req.user;
      // res.send(req.user);
      res.send(arr);
    }
    if(req.flash){
      var msg = ""+req.flash('accountMsg');
      res.send(msg);
    }
  }
  // function (err,req, res, next) {
  //   if(req.flash){
  //     var msg = ""+req.flash('accountMsg');
  //   //res.send(req.flash('accountMsg'));
  //   res.send(msg);
  //   }
  // }
);


//router dang ky học sinh
router.post('/studentregister', passport.authenticate('local-signup', {
  // failureRedirect: '/failed',
  // successRedirect: '/success',
  // failureFlash: true
  failWithError: true
}),
  function (req, res) {
    var msg = ""+req.flash('accountMsg');
    if(msg == 'Thành công'){
      res.send('Thành công');
    }
      else{
      res.send(msg);
    }
  }
  // function (err,req, res, next) {
  //   if(req.flash){
  //     var msg = ""+req.flash('accountMsg');
  //     //res.send(req.flash('accountMsg'));
  //     res.send(msg);
  //   }
  // }
);

//router dang ky giáo viên
router.post('/teacherregister', passport.authenticate('teacher-local-signup', {
  // failureRedirect: '/failed',
  // successRedirect: '/success',
  // failureFlash: true
  failWithError: true
}),
  function (req, res) {
    var msg = ""+req.flash('accountMsg');
    if(msg == 'Thành công'){
      res.send('Thành công');
    }
      else{
      res.send(msg);
    }
  }
  // function (err,req, res, next) {
  //   if(req.flash){
  //     var msg = ""+req.flash('accountMsg');
  //     //res.send(req.flash('accountMsg'));
  //     res.send(msg);
  //   }
  // }
);

router.post('/admin/createadmin', passport.authenticate('admin-local-signup', {
  // failureRedirect: '/failed',
  // successRedirect: '/success',
  // failureFlash: true
  failWithError: true
}),
function (req, res) {
  var msg = ""+req.flash('accountMsg');
    if(msg == 'Thành công'){
      res.send('Thành công');
    }
      else{
      res.send(msg);
    }
}
// function (err,req, res, next) {
//     if(req.flash){
//       var msg = ""+req.flash('accountMsg');
//       //res.send(req.flash('accountMsg'));
//       res.send(msg);
//     }
//   }
);


router.post('/verify', function(req, res, next){
  console.log(req.body.verify);
  accountModel.getAccountVerify(req.body.verify).then(r=>{
    if(r.length){
      accountModel.updateAccountVerify(r[0].id).then(r1=>{
        res.send('Thành công')
      }).catch(err=>{
        console.log(err);
        //req.flash('accountMsg', 'Lỗi khi xác thực');
        res.send('Lỗi khi xác thực')
      })
    }
    else{
      //req.flash('accountMsg', 'Xác thực không đúng.');
      res.send('Xác thực không đúng.');
    }
  }).catch(err=>{
    console.log(err);
    //req.flash('accountMsg', 'Lỗi khi xác thực');
    res.send('Lỗi khi xác thực');
  })
});

// router.get('/failed', function(req, res, next){
//   res.send(req.flash('accountMsg'));
// });
// router.get('/success', function(req, res, next){
//   res.send('Thành công');
// });
// router.get('/loginsuccess', function(req, res, next){
//   res.send(req.user);
// });

router.get('/chuyennganh', function(req, res, next){
  accountModel.getAllChuyenNganh().then(r=>{
    if(r.length){
      res.send(r);
      //res.send('avc');
    }
    else{
      // req.flash('accountMsg', 'Không có chuyên ngành nào.');
      res.send('Không có chuyên ngành nào.')
    }
  }).catch(err=>{
      console.log(err);
      //req.flash('accountMsg', 'Lỗi khi xác thực');
      res.send('Lỗi')
  })
});

module.exports = router;
