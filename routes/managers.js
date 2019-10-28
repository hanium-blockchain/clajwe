const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Assets = require('../models/assets');
const Coins = require('../models/coins');
const catchErrors = require('../lib/async-error');
const Investments = require('../models/assets');
const Evaluators = require('../models/evaluators');
 
router.get('/', (req, res, next) => {
  res.render('detail/manager_detail');
});

router.get('/register', catchErrors(async (req, res, next) => {
  var evaluatorHead = ['#', '평가자 ', '등록일자', '승인']
  const assign = await Evaluators.find({is_approved: false}).populate('user_id')
  res.render('list/manager_list', {title: '평가자 승인', list: evaluatorHead, evaluator: assign});
}))

router.get('/assign', catchErrors(async (req, res, next) => {
  var assignHead = ['#', '분류', '자산명', '등록자', '등록일시']
  const assign = await Investments.find({is_evaluate: true, is_approved: false}).populate('user_id').populate('values_id')
  console.log(assign);
  res.render('list/assign_list', {title: '승인되지 않은 투자리스트', list: assignHead, invest: assign});
}))

router.post('/assign/:id', catchErrors(async (req, res, next) => {
  const evaluator = await Evaluators.findById(req.params.id);
  evaluator.is_approved = true;
  evaluator.save();
  return res.json(evaluator)
}))

module.exports = router;