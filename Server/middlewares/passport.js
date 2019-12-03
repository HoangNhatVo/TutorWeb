var LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
var FacebookStrategy = require('passport-facebook').Strategy;
var nodemailer = require('nodemailer');
var request = require('request');
var moment = require('moment');
const bCrypt = require('bcrypt');
const saltRounds = 10;

var accountModel = require('../model/account.model');
var configAuth = require('../middlewares/auth');


module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy({
        callbackURL: '/user/google/redirect',
        clientID: '583261927649-u20u1jiuefhor9nvjgjrkghr1p667v9t.apps.googleusercontent.com',
        clientSecret: 'hlwVayAfydhSN--ffpP06XYw'
    }, (accessToken, refreshToken, profile, done) => {
        // var userData = {
        //     email: profile.emails[0].value,
        //     name: profile.displayName,
        //     token: accessToken
        // };
        // var user = new User();
        // user.username = profile.emails[0].value;
        // user.password = '123123';
        // user.save(err => {
        //     if (err)
        //         console.log("save error");
        // })
        // done(null, userData);
    })
)

passport.use('local-login', new LocalStrategy({
  usernameField : 'username',
  passwordField : 'password',
  passReqToCallback : true
},
function(req, username, password, done) {
  accountModel.getAccountByUsername(username).then(user => {
      if(!user.length){
          console.log('abcd');
          return done(null, false,req.flash('accountMsg', 'Tài khoản không tồn tại.'));
      }
      if(user[0].xacthuc==false){
        return done(null, false,req.flash('accountMsg', 'Tài khoản chưa được xác thực.'));
      }           
      if(!bCrypt.compareSync(password, user[0].password)){
          return done(null, false, req.flash('accountMsg', 'Mật khẩu không đúng.'));
      }     
      return done(null, user[0]);

  }).catch(err =>{
      console.log(err);
      return done(null, false, req.flash('accountMsg', 'Xảy ra lỗi.'));
  });

}));


  passport.use('local-signup', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true 
  },
  function(req, username, password, done) {
    accountModel.getAccountByUsername(username).then(r1=>{
        if(r1.length){
            return done(null, false,req.flash('accountMsg', 'Tài khoản đã tồn tại.'));
        }
        else{
            accountModel.getAccountByEmail(req.body.email).then(r2=>{
                if(r2.length){
                    return done(null, false,req.flash('accountMsg', 'Email đã tồn tại.'));
                }
                else{
                    accountModel.getAccountByPhone(req.body.sdt).then(r3=>{
                        if(r3.length){
                            return done(null, false, req.flash('accountMsg', 'SĐT đã tồn tại.'));
                        }
                        else{                          
                            var account = {
                              Username: username,
                              Password: bCrypt.hashSync(password, bCrypt.genSaltSync(saltRounds)),
                              HoTen: req.body.hoten,
                              Email: req.body.email,
                              NgaySinh: moment(req.body.ngaysinh,'DD/MM/YYYY').format('YYYY-MM-DD'),
                              GioiTinh: req.body.gioitinh,
                              DiaChi: req.body.diachi,
                              ThanhPho: req.body.thanhpho,
                              SDT: req.body.sdt,
                              ChuoiXacThuc: bCrypt.hashSync(username, bCrypt.genSaltSync(saltRounds))
                            }
                            console.log(account);
                            var transporter = nodemailer.createTransport({
                              service: 'Gmail',
                              auth: {
                                user: configAuth.email,
                                pass: configAuth.pass
                              }
                            });
                            var message = {
                              from: configAuth.from,
                              to: req.body.email,
                              subject: 'Xác thực đăng nhập từ TutorWeb',
                              test: 'Plaintext version of the message',
                              html: '<h3>Nhấn vào link sau để xác thực:  <a href="http://localhost:3000/verify/'+account.ChuoiXacThuc+'" target="_blank">Xác Thực Tài Khoản TutorWeb</a> </h3>'
                            };
                            transporter.sendMail(message, (err, info) => {
                              if (err) {
                                console.log('err', err);
                                return done(null, false, req.flash('accountMsg', 'Xảy ra lỗi khi gửi mail xác thực.'))
                              }
                              console.log('Message sent: %s', info.messageId);
                              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                            });
                            
                            accountModel.addStudent(account.Username, account.Password, account.HoTen, account.Email, account.NgaySinh,
                                account.GioiTinh, account.DiaChi, account.ThanhPho, account.SDT, account.ChuoiXacThuc).then(r=>{
                                    return done(null, true);
                                }).catch(err=>{
                                    console.log(err);
                                    return done(null, false, req.flash('accountMsg', 'Xảy ra lỗi.'));
                                })
                        }
                    }).catch(err=>{
                        console.log(err);
                        return done(null, false, req.flash('accountMsg', 'Xảy ra lỗi.'));
                    })
                }
            }).catch(err=>{
                console.log(err);
                return done(null, false, req.flash('accountMsg', 'Xảy ra lỗi.'));
            })
        }
    }).catch(err=>{
        console.log(err);
        return done(null, false, req.flash('accountMsg', 'Xảy ra lỗi.'));
        })
    }
  ));


  passport.use('teacher-local-signup', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true 
  },
  function(req, username, password, done) {
    accountModel.getAccountByUsername(username).then(r1=>{
        if(r1.length){
            return done(null, false,req.flash('accountMsg', 'Tài khoản đã tồn tại.'));
        }
        else{
            accountModel.getAccountByEmail(req.body.email).then(r2=>{
                if(r2.length){
                    return done(null, false,req.flash('accountMsg', 'Email đã tồn tại.'));
                }
                else{
                    accountModel.getAccountByPhone(req.body.sdt).then(r3=>{
                        if(r3.length){
                            return done(null, false, req.flash('accountMsg', 'SĐT đã tồn tại.'));
                        }
                        else{                          
                            var account = {
                              Username: username,
                              Password: bCrypt.hashSync(password, bCrypt.genSaltSync(saltRounds)),
                              HoTen: req.body.hoten,
                              Email: req.body.email,
                              NgaySinh: moment(req.body.ngaysinh,'DD/MM/YYYY').format('YYYY-MM-DD'),
                              GioiTinh: req.body.gioitinh,
                              DiaChi: req.body.diachi,
                              ThanhPho: req.body.thanhpho,
                              SDT: req.body.sdt,
                              BaiGioiThieu: req.body.baigioithieu,
                              MonHoc: req.body.monhoc,
                              ChuyenNganh: req.body.chuyennganh,
                              TienDay: req.body.tienday,
                              ChuoiXacThuc: bCrypt.hashSync(username, bCrypt.genSaltSync(saltRounds))
                            }

                            console.log(account);
                            
                            var transporter = nodemailer.createTransport({
                              service: 'Gmail',
                              auth: {
                                user: configAuth.email,
                                pass: configAuth.pass
                              }
                            });
                            var message = {
                              from: configAuth.from,
                              to: req.body.email,
                              subject: 'Xác thực đăng nhập từ TutorWeb',
                              test: 'Plaintext version of the message',
                              html: '<h3>Nhấn vào link sau để xác thực:  <a href="http://localhost:3000/verify/'+account.ChuoiXacThuc+'" target="_blank">Xác Thực Tài Khoản TutorWeb</a> </h3>'
                            };
                            transporter.sendMail(message, (err, info) => {
                              if (err) {
                                console.log('err', err);
                                return done(null, false, req.flash('accountMsg', 'Xảy ra lỗi khi gửi mail xác thực.'))
                              }
                              console.log('Message sent: %s', info.messageId);
                              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                            });
                            
                            accountModel.addTeacher(account.Username, account.Password, account.HoTen, account.Email, account.NgaySinh,
                                account.GioiTinh, account.DiaChi, account.ThanhPho, account.SDT,
                                account.BaiGioiThieu, account.MonHoc, account.ChuyenNganh, account.TienDay, account.ChuoiXacThuc).then(r=>{
                                    return done(null, true);
                                }).catch(err=>{
                                    console.log(err);
                                    return done(null, false, req.flash('accountMsg', 'Xảy ra lỗi.'));
                                })
                        }
                    }).catch(err=>{
                        console.log(err);
                        return done(null, false, req.flash('accountMsg', 'Xảy ra lỗi.'));
                    })
                }
            }).catch(err=>{
                console.log(err);
                return done(null, false, req.flash('accountMsg', 'Xảy ra lỗi.'));
            })
        }
    }).catch(err=>{
        console.log(err);
        return done(null, false, req.flash('accountMsg', 'Xảy ra lỗi.'));
        })
    }
  ));

  passport.use('admin-local-signup', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true 
  },
  function(req, username, password, done) {
    accountModel.getAccountByUsername(username).then(r1=>{
        if(r1.length){
            return done(null, false,req.flash('accountMsg', 'Tài khoản đã tồn tại.'));
        }
        else{
            accountModel.getAccountByEmail(req.body.email).then(r2=>{
                if(r2.length){
                    return done(null, false,req.flash('accountMsg', 'Email đã tồn tại.'));
                }
                else{
                    accountModel.getAccountByPhone(req.body.sdt).then(r3=>{
                        if(r3.length){
                            return done(null, false, req.flash('accountMsg', 'SĐT đã tồn tại.'));
                        }
                        else{                          
                            var account = {
                              Username: username,
                              Password: bCrypt.hashSync(password, bCrypt.genSaltSync(saltRounds)),
                              HoTen: req.body.hoten,
                              Email: req.body.email,
                              NgaySinh: moment(req.body.ngaysinh,'DD/MM/YYYY').format('YYYY-MM-DD'),
                              GioiTinh: req.body.gioitinh,
                              DiaChi: req.body.diachi,
                              ThanhPho: req.body.thanhpho,
                              SDT: req.body.sdt,
                            }
                            console.log(account);
                            // var transporter = nodemailer.createTransport({
                            //   service: 'Gmail',
                            //   auth: {
                            //     user: configAuth.email,
                            //     pass: configAuth.pass
                            //   }
                            // });
                            // var message = {
                            //   from: configAuth.from,
                            //   to: req.body.email,
                            //   subject: 'Xác thực đăng nhập từ TutorWeb',
                            //   test: 'Plaintext version of the message',
                            //   html: '<h3>Nhấn vào link sau để xác thực:  <a href="http://localhost:3000/verify/'+account.ChuoiXacThuc+'" target="_blank">Xác Thực Tài Khoản TutorWeb</a> </h3>'
                            // };
                            // transporter.sendMail(message, (err, info) => {
                            //   if (err) {
                            //     console.log('err', err);
                            //     return done(null, false, req.flash('accountMsg', 'Xảy ra lỗi khi gửi mail xác thực.'))
                            //   }
                            //   console.log('Message sent: %s', info.messageId);
                            //   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                            // });
                            
                            accountModel.addAdmin(account.Username, account.Password, account.HoTen, account.Email, account.NgaySinh,
                                account.GioiTinh, account.DiaChi, account.ThanhPho, account.SDT).then(r=>{
                                    return done(null, true);
                                }).catch(err=>{
                                    console.log(err);
                                    return done(null, false, req.flash('accountMsg', 'Xảy ra lỗi.'));
                                })
                        }
                    }).catch(err=>{
                        console.log(err);
                        return done(null, false, req.flash('accountMsg', 'Xảy ra lỗi.'));
                    })
                }
            }).catch(err=>{
                console.log(err);
                return done(null, false, req.flash('accountMsg', 'Xảy ra lỗi.'));
            })
        }
    }).catch(err=>{
        console.log(err);
        return done(null, false, req.flash('accountMsg', 'Xảy ra lỗi.'));
        })
    }
  ));

};