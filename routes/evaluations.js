var express = require('express');
var router = express.Router();

var Assets = require('../models/assets');
var Users = require('../models/users');
var Evaluations = require('../models/assets');
var Coins = require('../models/coins');
var Values = require('../models/values');

const catchErrors = require('../lib/async-error');


router.get('/detail/:id', catchErrors(async (req,res, next) => {
    const asset = await Assets.findById(req.params.id);
    // console.log("asset?? ", asset);
    const user = await Users.findById(req.session.user.id);
    // console.log("user???", user);
    res.render('detail/eval_detail', {asset: asset, user:user});
}));


router.post('/request_eval/:id', catchErrors(async (req,res,next)=>{
    var coinVal = req.body.value * 0.01;

    // var coin = new Coins({
    //     user_id: req.session.user.id,
    //     asset_id: req.params.id,
    //     coin : coinVal
    // });
    // coin.save();

    var evalValue = new Values({
        asset_id: req.params.id,
        user_id: req.session.user.id,
        value: req.body.value,
        value2coin: coinVal
    });
    evalValue.save();

    const asset = await Assets.findById(req.params.id);
    asset.is_evaluate = true;
    await asset.save();

    return res.redirect('../list');

}));



router.get('/list', catchErrors(async (req, res, next) => {
    var evalHead = ['#', '분류', '자산명', '등록자', '등록일시']
    const asset = await Assets.find({is_evaluate: false}).populate('user_id')
    // console.log(eval);
    res.render('list/eval_invest_list', {title: '평가되지 않은 리스트',check: 'eval', list: evalHead, eval: asset});
    
}));

module.exports = router;