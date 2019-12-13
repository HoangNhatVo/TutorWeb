var express = require('express');
var router = express.Router();
var accountModel = require('../model/account.model')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
 

router.post('/updateAva' , async function(req,res,next){
  try{
    var iduser = req.body.iduser
    var ava = req.body.ava
    await accountModel.updateAvatar(iduser,ava)
    res.send("Thành công")
  }
  catch(err) {
    res.send("Cập nhật avatar thất bại")
    console.log(err)
  }
})

router.post('/updateInfor', async function(req,res,next){
  try{
    var iduser = req.body.iduser
    var name = req.body.name
    var address = req.body.address
    await accountModel.updateInformation(iduser,name,address)
    res.send("Cập nhật thành công")
  }
  catch(err){
    res.send("Cập nhật thất bại")
    console.log(err)
  }
})

router.post('/updateTagname', async function(req,res,next){
  try{
    var iduser = req.body.iduser
    var tagname = req.body.tagname
    await accountModel.updateTagname(iduser,tagname)
    res.send("Cập nhật thành công")
  }
  catch(err){
    res.send("Cập nhập thất bại")
    console.log(err)
  }
})

router.post('/updateIntroduce', async function(req,res,next){
  try{
    var iduser = req.body.iduser
    var content = req.body.content
    await accountModel.updateIntroduce(iduser,content)
    res.send("Cập nhật thành công")
  }
  catch(err){
    res.send("Cập nhập thất bại")
    console.log(err)
  }
})

module.exports = router;
