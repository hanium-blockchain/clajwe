var express = require('express');
var router = express.Router();
var Data = require('./data')


router.get('/detail2', function(req, res, next){
    const user = {
        name: '김김김'
    }
    res.render('detail_includes/evaluate_asset', { user: user });
});

router.get('/list', function (req, res, next) {
    var evalHead = ['#', '분류', '자산명', '등록자', '등록일시']
    const eval = Data.evalList;
    res.render('list/eval_invest_list', {title: '평가되지 않은 리스트',check: 'eval', list: evalHead, eval: eval});
    
})

module.exports = router;