var express = require('express');
var router = express.Router();

router.get('/detail', function(req, res, next){
    const asset = {
        name : '아파아파트',
        number: '112233',
        address: '서울시 강남구 어쩌구',
        area: 11223333,
        complete_date: '2010-01-01',
        description: '주변에 편의시설이 많음. 지하철 역에서 10분거리. 화장실 ',
        end_date: '2020-05-05',
    }
    
    res.render('detail/detail_context', {asset: asset});
});

router.get('/detail2', function(req, res, next){
    const invest = {
        value: 1122333,
        invest_person_num: 3,
        invest_sum: 2233,
        invest_left: 1122,
    }
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
    var investHead = ['#', '분류', '자산명', '등록자', '등록일시']
    const invest = [
        {
            category: '건물',
            title: '명지대학교',
            register: '박희라',
            date: '2019.08.25'
        },
        {
            category: '아파트',
            title: '부양 1차 107동',
            register: '이아람',
            date: '2019.07.15'
        },{
            category: '부동산',
            title: '남가좌동 명지대 부지~~',
            register: '김이진',
            date: '2019.09.02'
        }
    ]
    res.render('list/eval_invest_list', {title: '평가되지 않은 리스트',check: 'invest', list: investHead, invest: invest});
})


module.exports = router;