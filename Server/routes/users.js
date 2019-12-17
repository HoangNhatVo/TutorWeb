var express = require('express');
var router = express.Router();
var accountModel = require('../model/account.model')
const paypal = require('paypal-rest-sdk')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/updateAva', async function (req, res, next) {
  try {
    var iduser = req.body.iduser
    var ava = req.body.ava
    await accountModel.updateAvatar(iduser, ava)
    res.send("Thành công")
  }
  catch (err) {
    res.send("Cập nhật avatar thất bại")
    console.log(err)
  }
})

router.post('/updateInfor', async function (req, res, next) {
  try {
    var iduser = req.body.iduser
    var name = req.body.name
    var address = req.body.address
    await accountModel.updateInformation(iduser, name, address)
    res.send("Cập nhật thành công")
  }
  catch (err) {
    res.send("Cập nhật thất bại")
    console.log(err)
  }
})

router.post('/updateTagname', async function (req, res, next) {
  try {
    var iduser = req.body.iduser
    var tagname = req.body.tagname
    await accountModel.updateTagname(iduser, tagname)
    res.send("Cập nhật thành công")
  }
  catch (err) {
    res.send("Cập nhập thất bại")
    console.log(err)
  }
})

router.post('/updateIntroduce', async function (req, res, next) {
  try {
    var iduser = req.body.iduser
    var content = req.body.content
    await accountModel.updateIntroduce(iduser, content)
    res.send("Cập nhật thành công")
  }
  catch (err) {
    res.send("Cập nhập thất bại")
    console.log(err)
  }
})

router.post('/pay', (req, res) => {
  const moneyhours= req.money;
  const hours = req.hours
  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:3000/user/success",
      "cancel_url": "http://localhost:3000/user/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "Contract",
          "sku": "001",
          "price": moneyhours,
          "currency": "USD",
          "quantity": hours
        }]
      },
      "amount": {
        "currency": "USD",
        "total": moneyhours*hours
      },
      "description": "Hat for the best team ever"
    }]
  };
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });

});

router.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  console.log(req.query)
  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": "25.00"
      }
    }]
  };
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log(JSON.stringify(payment));
      res.send('Success');
    }
  });
});

router.get('/cancel', (req, res) => res.send('Cancelled'));
module.exports = router;
