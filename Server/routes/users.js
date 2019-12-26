var express = require('express');
var router = express.Router();
var accountModel = require('../model/account.model')
const paypal = require('paypal-rest-sdk')
var moment = require('moment');
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

// router.post('/pay', (req, res) => {
//   const moneyhours = req.body.money;
//   const hours = req.body.hours;
//   const money = moneyhours * hours
//   const IDpayer = req.body.IDpayer
//   const IDreciver = req.body.IDreciver
//   const date = moment().format('YYYY-MM-DD HH:mm:ss');
//   const create_payment_json = {
//     "intent": "sale",
//     "payer": {
//       "payment_method": "paypal"
//     },
//     "redirect_urls": {
//       "return_url": "http://localhost:3000/user/success",
//       "cancel_url": "http://localhost:3000/user/cancel"
//     },
//     "transactions": [{
//       "item_list": {
//         "items": [{
//           "name": "Contract",
//           "sku": "001",
//           "price": "10.00",
//           "currency": "USD",
//           "quantity": 1
//         }]
//       },
//       "amount": {
//         "currency": "USD",
//         "total":  "10.00"
//       },
//       "description": "Hat for the best team ever"
//     }]
//   };
//   paypal.payment.create(create_payment_json, async function (error, payment) {
//     if (error) {
//       throw error;
//     } else {
//       // try {
//       //   await accountModel.create_transaction(IDpayer, IDreciver, money, '', date)
//       // }
//       // catch (err) {
//       //   console.log(err)
//       // }
//       for (let i = 0; i < payment.links.length; i++) {
//         if (payment.links[i].rel === 'approval_url') {
//           res.redirect(payment.links[i].href);
//         }
//       }
//     }
//   });

// });

router.post('/pay', (req, res) => {
  const hours = req.body.hours;
  const IDpayer = req.body.IDpayer
  const IDreciver = req.body.IDreciver
  const date = moment().format('YYYY-MM-DD HH:mm:ss');
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
          "price": "25.00",
          "currency": "USD",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "USD",
        "total": "25.00"
      },
      "description": "Hat for the best team ever"
    }]
  };
  paypal.payment.create(create_payment_json, async function (error, payment) {
    if (error) {
      throw error;
    } else {
      try {
        await accountModel.create_transaction(IDpayer, IDreciver, hours, date, date)
      }
      catch (err) {
        console.log(err)
      }
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
      // console.log(JSON.stringify(payment));
      res.send('Success');
    }
  });
});

router.get('/cancel', (req, res) => res.send('Cancelled'));

router.post('/payment' , (req, res) => {
  const hours = req.body.hours;
  const IDpayer = req.body.IDpayer
  const IDreciver = req.body.IDreciver
  const date = moment().format('YYYY-MM-DD HH:mm:ss');
  accountModel.create_transaction(IDpayer, IDreciver, hours, date, date)
  .then(r =>{
    res.send("thanh toán thành công")
  })
  .catch(err => {
    console.log(err)
  })
})
module.exports = router;
