var express = require('express');
var router = express.Router();

router.get('/detail2', function(req, res, next){
    const user = {
        name: '김김김'
    }
    res.render('detail_includes/evaluate_asset', { user: user });
});

router.get('/list', function (req, res, next) {
    var evalHead = ['#', '분류', '자산명', '등록자', '완료일자']
    const eval = [
        {
            category: '건물',
            title: '명지대학교',
            register: '박희라',
            D_day: '2019.08.25',
            value: 10000000000
        },
        {
            category: '아파트',
            title: '부양 1차 107동',
            register: '이아람',
            D_day: '2019.07.15',
            value: 300000
        },{
            category: '부동산',
            title: '남가좌동 명지대 부지~~',
            register: '김이진',
            D_day: '2019.09.02',
            value: 20000000
        }
    ]
    res.render('list/eval_invest_list', {title: '투자 가능한 리스트',check: 'eval', list: evalHead, eval: eval});
})

module.exports = router;