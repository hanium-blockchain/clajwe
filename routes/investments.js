const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Assets = require('../models/assets');
const Coins = require('../models/coins');
const Values = require('../models/values');
const AssetTokens = require('../models/assetTokens');

const catchErrors = require('../lib/async-error');
const Investments = require('../models/assets');

const API_call = require('../public/javascripts/API_call')();

var Data = require('./data');

function needAuth(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/');
    }
  }


router.get('/detail_inv/:id', needAuth, catchErrors(async (req, res, next)=> {
    
    
    const coin = await Coins.findById(req.params.id);
    const asset = await Assets.findById(coin.asset_id);
    const value = await Values.findOne({asset_id : coin.asset_id});
    
    if (req.session.user.is_manager == true) {
        var manager = true
    }

    const coins = await Coins.find({asset_id:coin.asset_id}); // 투자 리스트
    console.log('@@@ coins?', coins);

    var coinSum = 0;
    var leftSum = 0;
    var invPeople = coins.length;

    if(invPeople==0){
        coinSum = 0;
        leftSum = 0;
    } else {
        for(var i=0; i<coins.length; i++){
            var mycoin = coins[i];
            coinSum += mycoin.coin;
        }
        var leftSum = value.value2coin - coinSum;
    }
    
    res.render('detail/invest_detail', {asset: asset, value: value, isM: manager, coinSum: coinSum, leftSum: leftSum, invPeople: invPeople});
   
}));



router.get('/detail/:id', needAuth, catchErrors(async (req, res, next)=> {

    const asset = await Assets.findById(req.params.id);

    const value = await Values.findOne({asset_id : req.params.id});
    // console.log(req.session.user.is_manager)
    if (req.session.user.is_manager == true) {
        var manager = true
    }

    const coins = await Coins.find({asset_id:req.params.id});

    var coinSum = 0;
    var leftSum = 0;
    var invPeople = coins.length;

    if(invPeople==0){
        coinSum = 0;
        leftSum = 0;
    } else {
        for(var i=0; i<coins.length; i++){
            var coin = coins[i];
            // console.log('@@@coin? ', coin);
            // console.log(coin.coin);
            coinSum += coin.coin;
        }
        // console.log('@@@ coinSum?', coinSum);
    
        var leftSum = value.value2coin - coinSum;
        // console.log('@@@ leftSum? ', leftSum);
    }

    
    res.render('detail/invest_detail', {asset: asset, value: value, isM: manager, coinSum: coinSum, leftSum: leftSum, invPeople: invPeople});
    
}));

router.get('/detail_my/:id', needAuth, catchErrors(async (req, res, next)=> {

    const asset = await Assets.findById(req.params.id);

    console.log('@@@@@ asset? ', asset);


    res.render('detail/invest_detail_my', {asset: asset});
    
}));


router.post('/request_invest/:id', needAuth, catchErrors(async (req, res, next)=> {
    
    if(req.session.user.is_manager == true){ // 관리자 -> 승인하기 
    
        var params = [];
        var txaddress = null;
        var txhash = null;

        API_call.assetTokenize(function(err, result){
            if(!err){
                console.log('@@@@@ success!!! - tokenize asset @@@@@ ');
                console.log(result);
                
                txaddress = result.response.address;
                params._tokenId = result.response.txhash;
                params._assetId = req.params.id;

                params._txaddress = txaddress;

                var newAssetToken = new AssetTokens({
                    asset_id: req.params.id,
                    txhash: result.response.txhash,
                    address: result.response.address,
                });
                newAssetToken.save();

                API_call.goAssetToken(params, (err, result) => {
                    if(!err){
                        console.log('@@@@@ success!!! - go token @@@@@ ');
                        console.log(result);
                    } else {
                        console.log('@@@@@ go asset error @@@@@ ');
                        console.log(err);
                    }
                });

            } else {
                console.log(' @@@@@ error - tokenize asset @@@@@ ');
                console.log(err);
            }
        });
        const asset = await Assets.findById(req.params.id);
        asset.is_approved = true;
        await asset.save();

    } else { // 일반 사용자 -> 투자하기 

        console.log('@@@@@ this is invest @@@@@');

        var coin = new Coins({
            user_id: req.session.user.id,
            asset_id: req.params.id,
            coin: req.body.investValue
        });
        coin.save();
    }

    return res.redirect('back');
}));

router.get('/list', needAuth, catchErrors(async (req, res, next) => {
    var investHead = ['#', '분류', '자산명', '등록자', '완료일자', '가치']
    const invest = await Investments.find({is_evaluate: true, is_approved: true}).populate('user_id').populate('values_id')
    // console.log(invest);
    // value_id를 asset테이블에 추가하기 --> 평가할때, asset 테이블에 is_evaluate를 바꾸면서 value_id 값을 추가해준다.
    res.render('list/eval_invest_list', {title: '투자 가능한 리스트',check: 'invest', list: investHead, invest: invest});
}));




module.exports = router;