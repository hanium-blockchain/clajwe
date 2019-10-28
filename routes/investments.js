const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Assets = require('../models/assets');
const Coins = require('../models/coins');
const Values = require('../models/values');

const catchErrors = require('../lib/async-error');
const Investments = require('../models/assets');

var Data = require('./data');

function needAuth(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/users/signin');
    }
  }

// router.get('/detail', catchErrors(async (req, res, next)=> {
//     const asset = Data.asset
//     const invest = Data.investDetail2;

//     res.render('detail/invest_detail', {asset: asset, invest: invest});
// }))


router.get('/detail/:id', needAuth, catchErrors(async (req, res, next)=> {

    const asset = await Assets.findById(req.params.id);
    
    // var myValue = await Values.find().populate('asset_id');
    // console.log('@@@@@@', myValue);
    // // var v2c = await myValue.value2coin;

    // console.log(myValue[0].value2coin);
    // console.log(myValue.value);


    const value = await Values.findOne({asset_id : req.params.id});

    // var coin = new Coins({
    //     user_id: req.session.user.id,
    //     asset_id: req.params.id,
        
    // })
    console.log(req.session.user.is_manager)
    if (req.session.user.is_manager == true) {
        var manager = true
    }
    
    
    res.render('detail/invest_detail', {asset: asset, value: value, isM: manager});
    

    
}));


router.post('/request_invest/:id', needAuth, catchErrors(async (req, res, next)=> {
    
    // console.log(req.body.investValue);

    var coin = new Coins({
        user_id: req.session.user.id,
        asset_id: req.params.id,
        coin: req.body.investValue
    });
    coin.save();

    return res.redirect('back');
}))



router.get('/list', needAuth, catchErrors(async (req, res, next) => {
    var investHead = ['#', '분류', '자산명', '등록자', '완료일자']
    const invest = await Investments.find({is_evaluate: true, is_approved: true}).populate('user_id').populate('values_id')
    console.log(invest);
    // value_id를 asset테이블에 추가하기 --> 평가할때, asset 테이블에 is_evaluate를 바꾸면서 value_id 값을 추가해준다.
    res.render('list/eval_invest_list', {title: '투자 가능한 리스트',check: 'invest', list: investHead, invest: invest});
}));



router.post('/request_invest', needAuth,  (req, res, next) => {
    console.log(req.body);

    

});




module.exports = router;