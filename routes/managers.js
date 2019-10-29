const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Assets = require('../models/assets');
const Coins = require('../models/coins');
const catchErrors = require('../lib/async-error');
const Investments = require('../models/assets');
const Evaluators = require('../models/evaluators');
const Managers = require('../models/managers');
const API_call = require('../public/javascripts/API_call')();
function needAuth(req, res, next) {
  if (req.session.user) {
    if (req.session.user.is_manager) {
      next();
    } else {
      res.redirect('/');
    }
  } else {
    res.redirect('/');
  }
}
router.get('/', needAuth, (req, res, next) => {
  res.render('detail/manager_detail');
});

router.get('/register', needAuth, catchErrors(async (req, res, next) => {
  var evaluatorHead = ['#', '평가자 ', '등록일자', '승인']
  const assign = await Evaluators.find({is_approved: false}).populate('user_id')
  // console.log('assign', assign)
  res.render('list/manager_list', {title: '평가자 승인', list: evaluatorHead, evaluator: assign});
}))

router.get('/assign', needAuth, catchErrors(async (req, res, next) => {
  var assignHead = ['#', '분류', '자산명', '등록자', '등록일시']
  const assign = await Investments.find({is_evaluate: true, is_approved: false}).populate('user_id').populate('values_id')
  // console.log(assign);
  res.render('list/assign_list', {title: '승인되지 않은 투자리스트', list: assignHead, invest: assign});
}))

router.post('/assign/:id', needAuth, catchErrors(async (req, res, next) => {
  const evaluator = await Evaluators.findById(req.params.id).populate('user_id');
  evaluator.is_approved = true;
  evaluator.user_id.is_evaluate = true;
  evaluator.save();
  return res.json(evaluator)
}))
router.post('/makeToken', needAuth, catchErrors(async (req, res, next) => {
  var txhash, address, value= null 
  const mg = await Managers.find({})
  if (mg.length == 1) {
    mg[0].value += 100000000
    console.log(mg)
    await mg[0].save();
    console.log('토큰이 추가 생성되었습니당')
    return res.json(mg)
  } else if (mg.length == 0) {
    API_call.htokenDeploy((err, result) => {
      if(!err){
        console.log('@@@@@ no error-htokenDeploy @@@@@');
        // console.log(result);
        txhash = result.response.txhash
        address = result.response.address
  
        API_call.htokenInit(async (err, result) => {
          if(!err){
            console.log('@@@@@ no error-htokenInit @@@@@');
            // console.log(result);
            value = 100000000

            newToken = new Managers({
              address: address,
              txhash: txhash,
              value: value
            })
            await newToken.save();
          
            return res.json(newToken)
          } else {
            console.log('@@@@@ error-htokenInit @@@@@');
            console.log(err);
          }
        })
      } else {
        console.log('@@@@@ error-htokenDeploy @@@@@');
        console.log(err);
      }
    })
  }
}))

module.exports = router;