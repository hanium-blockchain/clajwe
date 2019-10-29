const express = require('express');
const Users = require('../models/users');
const Evaluators = require('../models/evaluators');
const router = express.Router();
const Assets = require('../models/assets');
const Hashes = require('../models/hashes');
const Coins = require('../models/coins');
const catchErrors = require('../lib/async-error');
const Values = require('../models/values');
const API_call = require('../public/javascripts/API_call')();


function needAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.alert('Please signin first.');
    res.redirect('/signin');
  }
}

function validateForm(form, options) {
  var name = form.name || "";
  var email = form.email || "";
  
  name = name.trim();
  email = email.trim();
  
  

  if (!name) {
    return 'Name is required.';
  }

  if (!email) {
    return 'Email is required.';
  }

  if (!form.password && options.needPassword) {
    return 'Password is required.';
  }

  if (form.password !== form.password_confirmation) {
    return 'Passsword do not match.';
  }

  if (form.password.length < 6) {
    return 'Password must be at least 6 characters.';
  }
  // if (is_evaluator==True) {
  //   var li_Category = form.li_Category || "";
  //   var li_birth = form.li_birth || "";
  //   var li_no = form.li_no || "";
  //   var li_date = form.li_date || "";
  //   var li_inner = form.li_inner || "";
  //   li_Category = li_Category.trim();
  //   li_birth = li_birth.trim();
  //   li_date = li_date.trim();
  //   li_no = li_no.trim();
  //   li_inner = li_inner.trim();

  //   if (!li_Category) {
  //     return 'Category is required.';
  //   }
  //   if (!li_birth) {
  //     return 'Birth is required.';
  //   }
  //   if (!li_no) {
  //     return '등록 번호 is required.';
  //   }
  //   if (!li_inner) {
  //     return '내지번호 is required.';
  //   }
  //   if (!li_date) {
  //     return 'Date is required.';
  //   }
  // }
  return null;
}




router.get('/', function(req, res, next) {
  res.render('user/login');
});

router.get('/signin', (req, res, next) => {
  res.render('user/signin');
});



router.post('/signin', catchErrors(async (req, res, next) => {
  var newUser = await Users.findOne({email: req.body.email});
  var newEval = await Evaluators.findOne({email: req.body.email});

  if (newUser) {
    console.log('이미 존재하는 메일')
    return res.redirect('back');
  }

  newUser = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    is_evaluator: false,
    is_manager: false
  });

  await newUser.save(); 
  console.log('@@@ user save');

  var addr = null
  var prv = null
  
  var value = 200;
  API_call.createWallet(async function(err, result){
    if(!err){
      console.log('@@@@@ no error-createWallet @@@@@');
      // console.log(result);
      addr = result.response.address
      prv = result.response.privateKey
      newHash = new Hashes({
        user_id: newUser.id,
        address: addr,
        prvKey: prv
      })
      await newHash.save();
      // console.log(newHash)
      API_call.saveWallet(addr, (err, result) => {
        if(!err){
          console.log('@@@@@ no error-saveWallet @@@@@');
          // console.log(result);
          
          API_call.hTokenTransfer(addr, value, (err, result) => {
            if(!err){
              console.log('@@@@@ success @@ htoken transfer @@@@@');
              // console.log(result);
              
              // console.log(addr,prv, "djWjrh")

            } else {
              console.log('@@@@@ error-htoken transfer @@@@@');
              console.log(err);
            }
          })

        } else {
          console.log('@@@@@ error-saveWallet @@@@@');
          console.log(err);
        }
      })
    } else {
      console.log('@@@@@ error-createWallet @@@@@');
      console.log(err);
    }
  })

  if (req.body.is_evaluator == true){
    newEval = new Evaluators({
      user_id: newUser.id,
      li_no: req.body.li_no,
      li_Category: req.body.li_Category,
      li_date: req.body.li_date,
      li_birth: req.body.li_birth,
      li_inner: req.body.li_inner
    });

    await newEval.save();
    console.log('@@@ eval success');
  }
 
  return res.redirect('/');
}));

router.post('/login', catchErrors (async (req, res, next) => {
  var userId = null;

  Users.findOne({email: req.body.email}, async function(err, user) {
    if (err) {
      console.log('err')
      res.redirect('back');
    } else if (!user || user.password !== req.body.password) {
      // console.log(user)
      res.redirect('back');
    } else {
      // console.log(user);
      req.session.user = user;
      // console.log(req.session.user.id)
      userId = req.session.user.id
      res.redirect('/home');
    }
   
    var hash = await Hashes.findOne({user_id: userId});
    // console.log('hash?????', hash);
    var addr = hash.address;
    var value = 20;
    // console.log(addr)
    API_call.hTokenTransfer(addr, value, (err, result) => {
      // console.log(addr,value, "djWjrh")

      if(!err){
        console.log('@@@@@ success @@ htoken transfer @@@@@');
        // console.log(result);
        
        // console.log(addr,value, "djWjrh")

      } else {
        console.log('@@@@@ error-htoken transfer @@@@@');
        console.log(err);
      }
    })


    
    // var hash = Hashes.findOne({user_id: req.session.user.id});
    // console.log('hash?????', hash);

    // var addr = hash.address;
    // API_call.hTokenTransfer(addr, value, (err, result) => {
    //   if(!err){
    //       console.log('@@@@@ success!!! - htoken transfer-login @@@@@ ');
    //       // console.log(result);
    //   } else {
    //       console.log(' @@@@@ error - htoken transfer -login @@@@@ ');
    //       console.log(err);
    //   }
    // });
  });


    
    


  
}));



module.exports = router;