/*
var express = require('express');
var router = express.Router();
var Data = require('./data')
var Investments = require('../models/assets');
var Values = require('../models/values');
const catchErrors = require('../lib/async-error');


router.get('/detail', function(req, res, next){
    const asset = Data.asset
    const invest = Data.investDetail2
    res.render('detail/invest_detail', {asset: asset, invest: invest});
});

router.post('/request_invest', (req, res, next) => {
    console.log(req.body);
    const asset = {
        asset_id: 123,
    }
    const user = {
        user_id: 'userid222',
    }

    const value2coin = 2 * req.body.investValue;

    connection.connect(function(err){
        if(err){
            console.log(err);
            console.log('connection error!!!');
            return res.redirect('back');
        }
        console.log('connection success!!!');
        // INSERT INTO eval_value (asset_id, user_id, value, value2coin) VALUES (1, 'userid', 10, 20);
        var sql = "INSERT INTO eval_value (asset_id, user_id, value, value2coin) VALUES (?, ?, ?, ?);"
        var params = [asset.asset_id, user.user_id, req.body.investValue, value2coin];
        connection.query(sql, params, function(err, result){
            if(err){
                console.log(err);
                console.log('data insert error!!!');
                return;
            }
            console.log('insert success!!!');
        })
    });


    res.redirect('back');
});

router.get('/liquidation', function(req, res, next){
    const asset = Data.asset
    res.render('detail/liquidation_detail', {asset: asset});
});

router.get('/info', function(req, res, next){
    const asset2 = Data.asset2
    const investList = [
        {
            name: '김김김',
            invest: 200,
        },
        {
            name: '박박박',
            invest: 300,
        },
        {
            name: '최최최',
            invest: 500,
        },
        {
            name: '정정정',
            invest: 300,
        }
    ]
    res.render('detail_includes/invest_info', { asset: asset2, investList: investList });
});


router.get('/list', catchErrors(async (req, res, next) => {
    var investHead = ['#', '분류', '자산명', '등록자', '완료일자']
    const invest = await Investments.find({is_evaluate: true}).populate('user_id').populate('values_id')
    console.log(invest);
    // value_id를 asset테이블에 추가하기 --> 평가할때, asset 테이블에 is_evaluate를 바꾸면서 value_id 값을 추가해준다.
    res.render('list/eval_invest_list', {title: '투자 가능한 리스트',check: 'invest', list: investHead, invest: invest});
}));


module.exports = router;
*/


const express = require('express');
const Users = require('../models/users');
const Assets = require('../models/assets');
const Coins = require('../models/coins');

const router = express.Router();
var Data = require('./data');

router.get('/detail/:id', function(req, res, next){
    const asset = Data.asset
    const invest = Data.investDetail2

    res.render('detail/invest_detail', {asset: asset, invest: invest});
});

router.get('/list', function (req, res, next) {
    var investHead = ['#', '분류', '자산명', '등록자', '완료일자']
    const invest = Data.investList
    res.render('list/eval_invest_list', {title: '투자 가능한 리스트',check: 'invest', list: investHead, invest: invest});
})

router.post('/request_invest',  (req, res, next) => {
    console.log(req.body);

    

});




module.exports = router;