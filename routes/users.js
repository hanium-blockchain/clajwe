var express = require('express');
var Users = require('../models/users');
var Evaluators = require('../models/evaluators');
var router = express.Router();

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

  return null;
}




/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', function(req, res, next) {
  res.render('user/login');
});

router.post('/login', function(req, res, next) {
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



router.post('/signin', async (req, res, next) => {
  var err = validateForm(req.body, {needPassword: true});
  if (err) {
    console.log(err)
    return res.redirect('back');
  }
  var newUser = await Users.findOne({email: req.body.email});
  var newEval1 = await Evaluators.findOne({email: req.body.email});
  console.log('USER???', newUser);
  console.log('USER???', newEval1);
  if (newUser) {
    console.log('이미 존재하는 메일')
    return res.redirect('back');
  }
  newUser = new Users({
    name: req.body.name,
    email: req.body.email,
    is_evaluator: req.body.is_evaluator? true:false,
    is_manager: false
    
  });
  if (newEval1) {
    console.log('이미 존재하는 메일')
    return res.redirect('back');
  }
  newEval1 = new Evaluators({
    li_no: req.body.li_no,
    li_Category: req.body.li_Category,
    li_date: req.body.li_date,
    li_birth: req.body.li_birth,
    li_inner: req.body.li_inner
    
  });

  console.log(req.body,"s")
  newUser.password = await newUser.generateHash(req.body.password);
  await newUser.save(); 
  await newEval1.save();
  console.log('성공~~')
  res.redirect('/users');
});


module.exports = router;