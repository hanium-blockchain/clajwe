var express = require('express');
var router = express.Router();
var Data = require('./data')

function needAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {

    res.redirect('/signin');
  }
}
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('user/mypage');
// });
router.get('/', function(req, res, next) {
  res.render('user/login');
  

});
router.get('/home', needAuth,function(req, res, next) {
  var myInvHead=[' ', '분류', '자산명', '가격']
  const myInv = Data.myInv;
  res.render('index',{check: 'myInv', list: myInvHead, myInv: myInv});

  
});
// router.get('/', function(req, res, next) {
//   res.render('user/login');
// });


module.exports = router;
