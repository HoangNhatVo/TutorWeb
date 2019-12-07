var express = require('express');
var router = express.Router();
const passport = require('passport');
var accountModel = require('../model/account.model');
var tagModel = require('../model/tag.model');
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

router.get('/profile/:ID', function(req, res, next){
  var id = req.params.ID;
  console.log(id);
  accountModel.getAccountByID(id).then(r=>{
    if(r.length){
      if(r[0].tinhtrang != 'active'){
        res.send('Tài khoản không còn hoạt động.');
      }
      else if(r[0].xacthuc == false){
        res.send('Chủ tài khoản này chưa xác thực.');
      }
      else{
        res.send(r[0]);
      }
    }
    else{
      res.send('Tài khoản không tồn tại.');
    }
  }).catch(err=>{
    console.log(err);
    res.send('Đã xảy ra lỗi.');
  })
})

router.get('/getallaccount',function(req, res, next){
  accountModel.getAllAccount().then(r=>{
    if(r.length){
      res.send(r);
    }
    else{
      res.send('Chưa có tài khoản nào.');
    }
  }).catch(err=>{
    console.log(err);
    res.send('Đã xảy ra lỗi.');
  })
})

router.post('/addtag', function(req, res, next){
    var TagName = req.body.tagname;
    tagModel.addTag(TagName).then(r=>{
      res.send(""+r[0].id);
    }).catch(err=>{
      console.log(err);
      res.send('Đã xảy ra lỗi.');
    })
})

router.post('/updatetagname', function(req, res, next){
    var ID = req.body.id;
    var TagName = req.body.tagnameupdate;
    tagModel.updateTagName(ID, TagName).then(r=>{
      if(r.length){
        if(r[0].temp == 0){
          res.send('Tag đã tồn tại.');
        }
        else{
          res.send('Thành công');
        }
      }
    }).catch(err=>{
      console.log(err);
      res.send('Đã xảy ra lỗi.');
    })
})

router.post('/deletetag', function(req, res, next){
    var ID = req.body.id;
    tagModel.deleteTag(ID).then(r=>{
      res.send('Thành công');
    }).catch(err=>{
      console.log(err);
      res.send('Đã xảy ra lỗi.');
    })
})

router.get('/alltag', function(req, res, next){
    tagModel.getAllTag().then(r=>{
      if(r.length){
        res.send(r);
      }
      else{
        res.send('Chưa có Tag nào.');
      }
    }).catch(err=>{
      console.log(err);
      res.send('Đã xảy ra lỗi.');
    })
})

router.post('/addtagaccount', function(req, res, next){
  var IDTag = req.body.idtag;
  var IDAccount = req.body.idaccount;
  tagModel.addTagAccount(IDTag, IDAccount).then(r=>{
    if(r.length){
      if(r[0].temp == 0){
      res.send('Tag này đã thuộc tài khoàn này từ trước.');
      }
      else{
        res.send('Thành công');
      }
    }
  }).catch(err=>{
    console.log(err);
    res.send('Đã xảy ra lỗi.');
  })
})


router.get('/tagdetail/:ID',function(req, res, next){
    var IDTag = req.params.ID;
    tagModel.getTagByID(IDTag).then(r=>{
      if(r.length){
        res.send(r[0]);
      }
      else{
        res.send('Tag không tồn tại.');
      }
    }).catch(err=>{
    console.log(err);
    res.send('Đã xảy ra lỗi.');
  })
})

module.exports = router;
