var express = require('express');
var router = express.Router();
var Data = require('./data')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('user/mypage');
// });
router.get('/', function(req, res, next) {
  var myInvHead=[' ', '분류', '자산명', '가격']
  const myInv = Data.myInv;
  res.render('index',{check: 'myInv', list: myInvHead, myInv: myInv});
  
  var myRegHead=[' ', '분류', '자산명', '가격']
  const myReg = Data.myReg;
  res.render('index',{check: 'myReg', list: myRegHead, myReg: myReg});


});
router.get('/home', function(req, res, next) {
  var myInvHead=[' ', '분류', '자산명', '가격']
  const myInv = Data.myInv;
  res.render('index',{check: 'myInv', list: myInvHead, myInv: myInv});

  var myRegHead=[' ', '분류', '자산명', '가격']
  const myReg = Data.myReg;
  res.render('index',{check: 'myReg', list: myRegHead, myReg: myReg});
  
});
// router.get('/', function(req, res, next) {
//   res.render('user/login');
// });


module.exports = router;
