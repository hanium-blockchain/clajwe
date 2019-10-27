var express = require('express');
var Users = require('../models/users');
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



router.post('/signin', (req, res, next) => {
  var err = validateForm(req.body, {needPassword: true});
  if(err){
    console.log(err)
    return res.redirect('back');
  }
  Users.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      console.log('이미존재하는 이메일')
      // req.alert('danger', 'Email address already exists.');
      return res.redirect('back');
    }
    var newUser = new Users({
      name: req.body.name,
      email: req.body.email,
      is_evaluator: false,
      is_manager: false
      
    });
    newUser.password = req.body.password;

    newUser.save(function(err) {
      if (err) {
        return next(err);
      } else {
        console.log('성공~~')
        
        // req.flash('success', 'Registered successfully. Please sign in.');
        res.redirect('/users');
      }
    });
  });

});




module.exports = router;