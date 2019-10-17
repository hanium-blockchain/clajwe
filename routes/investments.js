var express = require('express');
var router = express.Router();
var Data = require('./data')

router.get('/detail', function(req, res, next){
    const asset = Data.asset
    res.render('detail/detail_context', {asset: asset});
});

router.get('/detail2', function(req, res, next){
    const invest = Data.investDetail2
    res.render('detail_includes/invest_asset', {invest: invest});
});

router.get('/info', function(req, res, next){
    const asset = {
        value: 100100,
        left: 20020,
    }
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

    res.render('detail_includes/invest_info', { asset: asset, investList: investList });
});


router.get('/list', function (req, res, next) {
    var investHead = ['#', '분류', '자산명', '등록자', '완료일자']
    const invest = Data.investList
    const jsons = {
        data: invest
    }
    res.render('list/eval_invest_list', {title: '투자 가능한 리스트',check: 'invest', list: investHead, invest: invest});
})


module.exports = router;