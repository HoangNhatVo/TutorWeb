var express = require('express');
var router = express.Router();
const passport = require('passport');

var adminModel = require('../model/admin.model');
var accountModel = require('../model/account.model')
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

router.get('/Incometeacher/:idTeacher',async function(req, res, next) {
  var idTeacher = req.params.idTeacher
  try{
  var IncomeTeacher = await accountModel.GetIncomeByTeacher(idTeacher)
  res.send(IncomeTeacher)
  }
  catch(err) {
    console.log(err)
  }
})

router.get('/TopIncomebyDay', async function(req, res){
  var date = req.body.date
  console.log(date)
  try {
    var TopbyDay = await accountModel.GetTopInComebyDay(date)
    res.send(TopbyDay)
  }
  catch(err){
    console.log(err)
  }
})

router.get('/TopincomebyWeek', async function(req,res){
  var week = req.body.week
  var year = req.body.year
  try{
    var TopbyWeek = await accountModel.GetTopInComebyWeek(week,year)
    res.send(TopbyWeek)
  }
  catch(err){
    console.log(err)
  }
})

router.get('/TopincomebyMonth', async function(req,res){
  var month = req.body.month
  var year = req.body.year
  try{
    var Topbymonth = await accountModel.GetTopInComebyMonth(month,year)
    res.send(Topbymonth)
  }
  catch(err){
    console.log(err)
  }
})

router.get('/TopincomebyQuarter', async function(req,res){
  var quarter = req.body.quarter
  var year = req.body.year
  try{
    var Topbyquarter = await accountModel.GetTopInComebyQuarter(quarter,year)
    res.send(Topbyquarter)
  }
  catch(err){
    console.log(err)
  }
})

router.get('/TopAll', async function(req,res){
  try{
    var TopAll = await accountModel.GetTopInComebyAll()
    res.send(TopAll)
  }
  catch(err){
    console.log(err)
  }
})

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
