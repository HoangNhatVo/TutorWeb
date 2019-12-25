var express = require('express');
var router = express.Router();
const passport = require('passport');
var accountModel = require('../model/account.model');
var tagModel = require('../model/tag.model');
var contractModel = require('../model/contract.model');
var chatModel = require('../model/chat.model');
var bCrypt = require('bcrypt');
const saltRounds = 10;
var moment = require('moment');

var configAuth = require('../middlewares/auth');
var nodemailer = require('nodemailer');
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

router.get('/home', function (req, res, next) {
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


router.post('/verify', function (req, res, next) {
  console.log(req.body.verify);
  accountModel.getAccountVerify(req.body.verify).then(r => {
    if (r.length) {
      accountModel.updateAccountVerify(r[0].id).then(r1 => {
        res.send('Thành công')
      }).catch(err => {
        console.log(err);
        //req.flash('accountMsg', 'Lỗi khi xác thực');
        res.send('Lỗi khi xác thực')
      })
    }
    else {
      //req.flash('accountMsg', 'Xác thực không đúng.');
      res.send('Xác thực không đúng.');
    }
  }).catch(err => {
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

router.get('/chuyennganh', function (req, res, next) {
  accountModel.getAllChuyenNganh().then(r => {
    if (r.length) {
      res.send(r);
    }
    else {
      // req.flash('accountMsg', 'Không có chuyên ngành nào.');
      res.send('Không có chuyên ngành nào.')
    }
  }).catch(err => {
    console.log(err);
    //req.flash('accountMsg', 'Lỗi khi xác thực');
    res.send('Lỗi')
  })
});

router.get('/allTeacher', async function (req, res, next) {
  try {
    var allTeacher = await accountModel.getAllteacher()
    if (allTeacher.length){
      for(var i = 0; i< allTeacher.length; i++){
        var allTags = await tagModel.getAllTagByAccID(allTeacher[i].id);
        console.log(allTags);
        allTeacher[i]['tags']=allTags;
      }
      res.send(allTeacher);
    }
    else
      res.send([])
  }
  catch (err) {
    console.log(err)
  }
})

router.get('/alladmin', async function (req, res, next) {
  try {
    var allAdmin = await accountModel.getAllAdmin()
    if (allAdmin.length)
      res.send(allAdmin)
    else
      res.send('Không có admin nào.');
  }
  catch (err) {
    console.log(err)
  }
})

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
        if(r[0].vaitro!=2){
          res.send({user: r[0]});
        }
        else{
          tagModel.getAllTagByAccID(id).then(r2=>{
            if(r2.length){
              if(r[0].chuyennganh!=1){
                accountModel.get_ChuyenNganh_ByID(r[0].chuyennganh).then(r3=>{
                  if(r3.length){
                    console.log('abc');
                    res.json({
                      user: r[0],
                      tag: r2,
                      chuyennganh: r3[0]});
                  }
                  else{
                    res.send({user: r[0],tag: r2});
                  }
                }).catch(err=>{
                  console.log(err);
                  res.send('Đã xảy ra lỗi.');
                })
              }
            }
            else{
              res.send(r[0]);
            }
          }).catch(err=>{
            console.log(err);
            res.send('Đã xảy ra lỗi.');
          })
        }
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


router.post('/changepassword', function(req,res,next){
  var ID = req.body.id;
  var newPass = bCrypt.hashSync(req.body.newpassword, bCrypt.genSaltSync(saltRounds));
  accountModel.getAccountByID(ID).then(r=>{
    if(!r.length){
      res.send('Không tìm thấy người dùng.');
    }
    else{
      if(!bCrypt.compareSync(req.body.curpassword, r[0].password)){
        res.send('Nhập mật khẩu hiện tại không đúng.');
      }
      else{
        accountModel.updatePasswordAccountByID(ID, newPass).then(r1=>{
          res.send('Thành công');
        }).catch(err=>{
          console.log(err);
          res.send('Đã xảy ra lỗi.');
        })
      }
    }
  }).catch(err=>{
    console.log(err);
    res.send('Đã xảy ra lỗi.');
  })
})


router.post('/resetpassword', function(req,res,next){
  var verify = req.body.verify;
  var newPass = bCrypt.hashSync(req.body.newpassword, bCrypt.genSaltSync(saltRounds));
  accountModel.getAccountVerify(verify).then(r=>{
    if(r.length){
      accountModel.updatePasswordAccountByID(r[0].id, newPass).then(r1=>{
        res.send('Thành công');
      }).catch(err=>{
        console.log(err);
        res.send('Đã xảy ra lỗi.');
      })
    }
    else{
      res.send('Xác thực không đúng.');
    }
  }).catch(err=>{
    console.log(err);
    res.send('Đã xảy ra lỗi.');
  })
})

router.post('/sendmailresetpassword', function(req,res,next){
  var ToEmail = req.body.toemail;
  accountModel.getAccountByEmail(ToEmail).then(r=>{
    if(r.length){
      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: configAuth.email,
          pass: configAuth.pass
        }
      });
      var message = {
        from: configAuth.from,
        to: ToEmail,
        subject: 'Reset Mật khẩu đăng nhập',
        test: 'Plaintext version of the message',
        html: '<h3>Nhấn vào link sau để xác thực:  <a href="http://localhost:3001/resetpassword/'+r[0].chuoixacthuc+'" target="_blank">Xác Thực Tài Khoản TutorWeb</a> </h3>'
      };
      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log('err', err);
        }
        res.send('Thành công');
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
    }
    else{
      res.send('Email không tồn tại.');
    }
  }).catch(err=>{
    console.log(err);
    res.send('Đã xảy ra lỗi.');
  })
})

router.post('/changestatusaccount', function(req, res, next){
  var ID = req.body.id;
  var newStatus = req.body.newstatus;
  accountModel.getAccountByID(ID).then(r1=>{
    if(!r1.length){
      res.send('Tài khoản không tồn tại.');
    }
    else{
      accountModel.changeStatusAccount(ID, newStatus).then(r=>{
        res.send('Thành công');
      }).catch(err=>{
        console.log(err);
        res.send('Đã xảy ra lỗi.');
      })
    }
  }).catch(err=>{
    console.log(err);
    res.send('Đã xảy ra lỗi.');
  })
})

router.get('/listcontract',function(req, res, next){
    accountModel.getAllContract().then(r=>{
      if(r.length){
        res.send(r);
      }
      else{
        res.send('Chưa có Hợp đồng nào.');
      }
    }).catch(err=>{
      console.log(err);
      res.send('Đã xảy ra lỗi.');
    })
})

router.post('/createcontract', function(req, res, next){
  var TenHopDong = req.body.tenhopdong;
  var IDNguoiDay = req.body.idnguoiday;
  var IDNguoiHoc = req.body.idnguoihoc;
  var ThoiGianKy = moment(req.body.thoigianky, 'DD/MM/YYYY').format('YYYY-MM-DD');
  console.log(TenHopDong);
  console.log(IDNguoiDay);
  console.log(IDNguoiHoc);
  console.log(ThoiGianKy);
  contractModel.addContract(TenHopDong, IDNguoiDay, IDNguoiHoc, ThoiGianKy).then(r=>{
    if(r.length){
      res.send(r);
    }
    else{
      res.send('Thêm Hợp đồng thất bại.');
    }
  }).catch(err=>{
      console.log(err);
      res.send('Đã xảy ra lỗi.');
    })
})

router.post('/adddkhd', function(req, res, next){
  var IDHD = req.body.idhd;
  var NoiDung = req.body.noidung;
  var BenThucHien = req.body.benthuchien;
  contractModel.add_DieuKhoanHopDong(IDHD, NoiDung, BenThucHien) .then(r=>{
    res.send('Thành công');
  }).catch(err=>{
      console.log(err);
      res.send('Đã xảy ra lỗi.');
    })
})

router.post('/changestatuscontract', function(req, res, next){
  var IDContract = req.body.idcontract;
  var StatusNew = req.body.statusnew;
  contractModel.updateStatusContract(IDContract, StatusNew) .then(r=>{
    res.send('Thành công');
  }).catch(err=>{
      console.log(err);
      res.send('Đã xảy ra lỗi.');
    })
})

router.get('/allcontractbyteacher/:ID',async function(req, res, next){
  var TeacherID = req.params.ID;
  try {
    var allContractTeacher = await contractModel.getAllContractByTeacherID(TeacherID);
    if (allContractTeacher.length){
      for(var i = 0; i< allContractTeacher.length; i++){
        var isRead = await contractModel.getIsReadByIDContract(allContractTeacher[i].IDContract);
        allContractTeacher[i]['isRead']=isRead[0].isRead;
      }
      res.send(allContractTeacher);
    }
    else
      res.send([])
  }
  catch (err) {
    console.log(err)
    res.send('Đã xảy ra lỗi.');
  }
})

router.get('/allcontractbystudent/:ID',async function(req, res, next){

  var StudentID = req.params.ID;
  try {
    var allContractStudent = await contractModel.getAllContractByStudentID(StudentID);
    if (allContractStudent.length){
      for(var i = 0; i< allContractStudent.length; i++){
        var isRead = await contractModel.getIsReadByIDContract(allContractStudent[i].IDContract);
        allContractStudent[i]['isRead']=isRead[0].isRead;
      }
      res.send(allContractStudent);
    }
    else
      res.send([])
  }
  catch (err) {
    console.log(err)
    res.send('Đã xảy ra lỗi.');
  }
})

router.get('/contract/:ID', async function(req, res, next){
    var ID = req.params.ID;
    contractModel.getContractByID(ID).then(r=>{
      if(r.length){
        res.send(r);
      }
      else{
        res.send('Hợp đồng không tồn tại.');
      }
    }).catch(err=>{
    console.log(err);
    res.send('Đã xảy ra lỗi.');
    })
})

router.get('/tagteacher/:ID',function(req, res, next){
  var ID = req.params.ID;
  accountModel.getAccountByID(ID).then(r1=>{
    if(r1.length){
      tagModel.getAllTagByAccID(ID).then(r=>{
        if(r.length){
          res.send(r);
        }
        else{
          res.send('Không có Tag nào.');
        }
      }).catch(err=>{
      console.log(err);
      res.send('Đã xảy ra lỗi.');
      })
    }
    else{
      res.send('Tài khoản không tồn tại.');
    }
  }).catch(err=>{
  console.log(err);
  res.send('Đã xảy ra lỗi.');
  })

  
})

router.get('/dkhd/:contractID',function(req, res, next){
  var ContractID = req.params.contractID;
  contractModel.get_DieuKhoanHopDong_ByIDContract(ContractID).then(r=>{
    if(r.length){
      res.send(r);
    }
    else{
      res.send('Không có điều khoản nào trong hợp đồng này.');
    }
  }).catch(err=>{
  console.log(err);
  res.send('Đã xảy ra lỗi.');
  })
})



router.post('/addcmtcontract', function(req, res, next){
  var IDContract = req.body.idcontract;
  var CMT = req.body.cmt;
  contractModel.addCmtContractByID(IDContract, CMT) .then(r=>{
    res.send('Thành công');
  }).catch(err=>{
      console.log(err);
      res.send('Đã xảy ra lỗi.');
    })
})


router.post('/addscorecontract', function(req, res, next){
  var IDContract = req.body.idcontract;
  var Score = req.body.score;
  contractModel.addScoreContractByID(IDContract, Score) .then(r=>{
    res.send('Thành công');
  }).catch(err=>{
      console.log(err);
      res.send('Đã xảy ra lỗi.');
    })
})


router.post('/addknhd', function(req, res, next){
  var IDNguoiKhieuNai = req.body.idnguoikhieunai;
  var IDHopDong = req.body.idhopdong;
  var NoiDung = req.body.noidung;
  var ThoiGianKhieuNai = moment().format('YYYY-MM-DD HH:mm:ss');
  console.log(IDNguoiKhieuNai);
  console.log(IDHopDong);
  console.log(NoiDung);
  console.log(ThoiGianKhieuNai);
  
  contractModel.addKNHD(IDNguoiKhieuNai, IDHopDong, NoiDung, ThoiGianKhieuNai).then(r=>{
    res.send('Thành công');
  }).catch(err=>{
      console.log(err);
      res.send('Đã xảy ra lỗi.');
    })
})


router.get('/allcmtofteacher/:ID', function(req, res, next){
  var IDTeacher = req.params.ID;
  contractModel.getAllCMTOfTeacherByID(IDTeacher) .then(r=>{
    if(r.length){
      res.send(r);
    }
    else{
      res.send('Không có đánh giá nào.')
    }
  }).catch(err=>{
      console.log(err);
      res.send('Đã xảy ra lỗi.');
    })
})

router.get('/allknhd', function(req, res, next){
  contractModel.getAllKNHD() .then(r=>{
    if(r.length){
      res.send(r);
    }
    else{
      res.send('Không có khiếu nại nào.')
    }
  }).catch(err=>{
      console.log(err);
      res.send('Đã xảy ra lỗi.');
    })
})

router.get('/knhd/:ID', function(req, res, next){
  var IDHD = req.params.ID;
  contractModel.getAllKNHDByIDHD(IDHD) .then(r=>{
    if(r.length){
      res.send(r);
    }
    else{
      res.send('Không có khiếu nại nào.')
    }
  }).catch(err=>{
      console.log(err);
      res.send('Đã xảy ra lỗi.');
    })
})

router.post('/chat', function(req, res, next){
  var IDNguoiGui = req.body.idnguoigui;
  var IDNguoiNhan = req.body.idnguoinhan;
  var NoiDung = req.body.noidung;
  var IDHD = req.body.idhd;
  var ThoiGianChat = moment().format('YYYY-MM-DD HH:mm:ss');
  chatModel.addChat(IDNguoiGui, IDNguoiNhan, NoiDung, ThoiGianChat,IDHD).then(r=>{
    if(r.length){
      res.send(r);
    }
    else{
      res.send('Chat không thành công.')
    }
  }).catch(err=>{
      console.log(err);
      res.send('Đã xảy ra lỗi.');
    })
})

// router.get('/getchat/user1=:ID1&user2=:ID2', function(req, res, next){
//   var IDUser1 = req.params.ID1;
//   var IDUser2 = req.params.ID2;
//   chatModel.getChat(IDUser1, IDUser2) .then(r=>{
//     if(r.length){
//       res.send(r);
//     }
//     else{
//       res.send('Không có đoạn chat nào.')
//     }
//   }).catch(err=>{
//       console.log(err);
//       res.send('Đã xảy ra lỗi.');
//     })
// })

router.get('/getchat/:ID', function(req, res, next){
  var IDContract = req.params.ID;
  chatModel.getChatByIDContract(IDContract) .then(r=>{
    if(r.length){
      res.send(r);
    }
    else{
      res.send('Không có đoạn chat nào.')
    }
  }).catch(err=>{
      console.log(err);
      res.send('Đã xảy ra lỗi.');
    })
})

router.post('/filterteacher', async function (req, res, next) {
  var DiaDiem = req.body.diadiem;
  var TienDay = req.body.tienday;
  var TenTag = req.body.tentag;
  if(TienDay==null||TienDay==''||TienDay==undefined){
    TienDay = 0;
  }
  try {
    var allTeacher = await accountModel.filterTeacher(DiaDiem, TienDay, TenTag);
    if (allTeacher.length){
      for(var i = 0; i< allTeacher.length; i++){
        var allTags = await tagModel.getAllTagByAccID(allTeacher[i].id);
        console.log(allTags);
        allTeacher[i]['tags']=allTags;
      }
      res.send(allTeacher);
    }
    else
      res.send([])
  }
  catch (err) {
    console.log(err)
  }
})

module.exports = router;
