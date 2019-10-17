var express = require('express');
var router = express.Router();
var Data = require('./data')


router.get('/register', function (req, res, next) {
  var evaluatorHead = ['#', '평가자 ', '등록일자', '승인']
  const evaluator = Data.evaluatorList
  res.render('list/manager_list', {title: '평가자 승인', list: evaluatorHead, evaluator: evaluator});
})

router.get('/assign', function (req, res, next) {
  var evalHead = ['#', '분류', '자산명', '등록자', '등록일시']
    const eval = Data.evalList;
    res.render('list/assign_list', {title: '승인되지 않은 투자리스트',check: 'eval', list: evalHead, eval: eval});
})

module.exports = router;