const express = require('express');
const Users = require('../models/users');
const Evaluators = require('../models/evaluators');
const router = express.Router();
const Assets = require('../models/assets');
const Coins = require('../models/coins');
const catchErrors = require('../lib/async-error');
const Values = require('../models/values');
const server = require('../public/javascripts/server')();
const request = require('request');


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

router.post('/login', function(req, res, next) {
  server.createWallet(function(err, result){
    if(!err){
      console.log('@@@@@ no error @@@@@');
      console.log(result);
    } else {
      console.log('@@@@@ error @@@@@');
      console.log(err);
    }
  })

  Users.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      console.log('err')
      res.redirect('back');
    } else if (!user || user.password !== req.body.password) {
      console.log(user)
      res.redirect('back');
    } else {
      console.log(user);
      req.session.user = user;
      res.redirect('/home');
    }
  });
});


router.get('/signin', (req, res, next) => {
  res.render('user/signin');
});



router.post('/signin', catchErrors(async (req, res, next) => {
  var newUser = await Users.findOne({email: req.body.email});
  var newEval1 = await Evaluators.findOne({email: req.body.email});

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

  API.createWallet((err, result) => {
    if (!err) {
      console.log('지갑 생성 성공');
      console.log(result);
    } else {
      console.log('에러~~~');
      console.log(err);
    }
  });

  if (req.body.is_evaluator == true){
    newEval1 = new Evaluators({
      user_id: user.user_id,
      li_no: req.body.li_no,
      li_Category: req.body.li_Category,
      li_date: req.body.li_date,
      li_birth: req.body.li_birth,
      li_inner: req.body.li_inner
    });

    await newEval1.save();
    console.log('@@@ eval success');
  }
 
  return res.redirect('back');
}));


module.exports = router;