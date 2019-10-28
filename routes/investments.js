const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Assets = require('../models/assets');
const Coins = require('../models/coins');
const catchErrors = require('../lib/async-error');
const Investments = require('../models/assets');

var Data = require('./data');

router.get('/detail/:id', function(req, res, next){
    const asset = Data.asset
    const invest = Data.investDetail2

    res.render('detail/invest_detail', {asset: asset, invest: invest});
});

router.get('/list', catchErrors(async (req, res, next) => {
    var investHead = ['#', '분류', '자산명', '등록자', '완료일자']
    const invest = await Investments.find({is_evaluate: true, is_approved: true}).populate('user_id').populate('values_id')
    console.log(invest);
    // value_id를 asset테이블에 추가하기 --> 평가할때, asset 테이블에 is_evaluate를 바꾸면서 value_id 값을 추가해준다.
    res.render('list/eval_invest_list', {title: '투자 가능한 리스트',check: 'invest', list: investHead, invest: invest});
}));

router.post('/request_invest',  (req, res, next) => {
    console.log(req.body);

    

});




module.exports = router;