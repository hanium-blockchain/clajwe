var express = require('express');
var router = express.Router();
const Assets = require('../models/assets');
const Coins = require('../models/coins');
const catchErrors = require('../lib/async-error');

function needAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {

    res.redirect('/');
  }
}
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('user/mypage');
// });
router.get('/', function(req, res, next) {
  res.render('user/login');
  

});
router.get('/home', needAuth,catchErrors(async (req, res, next) => {
  console.log('user',req.session.user)
  const assetList = await Assets.find({user_id: req.session.user.id});
  const invList = await Coins.find({user_id: req.session.user.id}).populate('asset_id');
  var myAstHead=[' ', '분류', '자산명']
  var myInvHead=[' ', '분류', '자산명', '투자한 코인']
  console.log('ast', assetList)
  console.log('inv', invList)
  res.render('index',{astList: myAstHead, invList: myInvHead, myInv: invList, myAst: assetList});
}));
// router.get('/', function(req, res, next) {
//   res.render('user/login');
// });
router.get('/signout', function(req, res, next) {
  delete req.session.user;
  res.redirect('/');
});

module.exports = router;
