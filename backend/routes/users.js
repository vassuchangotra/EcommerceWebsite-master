var express = require('express');
var router = express.Router();
var User=require('../models/user');
var bodyParser=require('body-parser');
var passport=require('passport');
var multer=require('multer');
var nodemailer=require('nodemailer');
const { authenticate } = require('passport');
const fileUpload = require('express-fileupload');
var paypal = require('paypal-rest-sdk');
router.use(bodyParser.json());
require('dotenv').config();
const httpProxy = require('http-proxy');
const jwt=require('jsonwebtoken');
const proxy = httpProxy.createServer({});
router.use(express.static("routes"));
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.API_ID,
  'client_secret': process.env.API_SECRET
});
router.post('/pay',(req,res,next)=>{
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": `http://localhost:5000/success/${req.body.total}`,
        "cancel_url": "http://localhost:5000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": req.body.arr
        },
        "amount": {
            "currency": "USD",
            "total": req.body.total
        },
        "description": "This is the paypal payment"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
    console.log(payment);
      for(let i=0;i<payment.links.length;i++){
        if(payment.links[i].rel=== 'approval_url'){
          res.send(payment.links[i].href);
          break;
        }
      }
  }
});
});
router.get('/success/:id',(req,res,next)=>{
  const payerId=req.query.PayerID;
  payid=req.query.PayerID;
  const paymentId=req.query.paymentId;
  // var pr=0
  // User.findOne({username:req.session.passport.user})
  // .then((user)=>{
  //   pr=user.total;
  // })
  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": req.params.id
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.redirect("http://localhost:3000/invoice");
    }
});
console.log("success");
});
router.post("/tot",(req,res,next)=>{
  User.findOne({username:req.session.passport.user})
  .then((user)=>{
    User.update({username:req.session.passport.user},{
      total:req.body.tot
    }, function(err, affected, resp) {
      console.log(resp);
  });
  })
});
router.post("/history",(req,res,next)=>{
  User.findOne({username:req.session.passport.user})
  .then((user)=>{
    User.update({username:req.session.passport.user},{
      cart:req.body.arr
    }, function(err, affected, resp) {
      console.log(resp);
  });
  })
});
router.get('/cancel',(req,res)=>{
  res.send('cancelled');
});
router.get("/cartDetail",(req,res,next)=>{
  User.findOne({username:req.session.passport.user})
  .then((user)=>{
    res.send(user);
  })
});
router.post('/dellist',(req,res,next)=>{
  User.findOne({username:req.session.passport.user})
  .then((user)=>{
    User.update({username:req.session.passport.user},{
      $pull: { "cart" : { folder: req.body.movie.folder } },
   }, function(err, affected, resp) {
     console.log(resp);
  });
  })
});
router.post("/cart",(req,res,next)=>{
  User.findOne({username:req.session.passport.user})
  .then((user)=>{
    User.update({username:req.session.passport.user},{
      $push: {"cart": req.body.arr},
    }, function(err, affected, resp) {
      console.log(resp);
  });
  })
})
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup', (req, res, next) => {
  const user=new User({username: req.body.username,email:req.body.email,address:req.body.address,state:req.body.state})
  User.register(user, 
    req.body.password, (err, user) => {
      console.log("hehe");
    if(err) {
      console.log(err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      console.log(user);
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});
router.get("/profile",(req,res,next)=>{
  User.find({username:req.session.passport.user})
  .then((user)=>{
    res.send(user);
  })
})
router.post('/login', (req, res) => {
  User.findOne({username:req.body.username})
  .then((user)=>{
      if(user){
        const token =jwt.sign({user},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIREIN});
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({token:token});
        });
      }
      else{
        res.statusCode = 401;
         res.setHeader('Content-Type', 'application/json');
        res.json({success:false});
      }
  })
});
router.post("/address",(req,res,next)=>{
  User.findOne({username:req.session.passport.user})
  .then((user)=>{
    User.update({username:req.session.passport.user},{
      address:req.body.city,
      state:req.body.state
    }, function(err, affected, resp) {
      console.log(resp);
  });
  })
})
router.post('/set',(req,res,next)=>{
  User.findOne({username:req.req.session.passport.user})
  .then((user)=>{
    user.setPassword(req.body.newpass,function(err){
      if(err){
        res.send(err);
      }
      user.save();
      res.send("DONE!!");
    });
})
.catch((err)=>next(err));
});
router.post('/updatePassword',(req,res,next)=>{
    User.findOne({username:req.session.passport.user})
    .then((user)=>{
      user.changePassword(req.body.old,req.body.update,function(err){
        if(err){
          res.send(err);
        }
        user.save();
        res.send("DONE!!");
      });
      })
      .catch((err)=>next(err));
  });
router.get('/logout',(req,res,next)=>{
  req.session.destroy();
  res.clearCookie('session_id');
  // cookies.set({expires: Date.now()});
});
router.use(fileUpload());
router.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/images/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/images/${file.name}` });
  });
});
module.exports = router;
