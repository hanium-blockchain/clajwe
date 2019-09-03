var express = require('express');
var router = express.Router();

router.get('/detail2', function(req, res, next){
    const user = {
        name: '김김김'
    }
    res.render('detail_includes/evaluate_asset', { user: user });
});

module.exports = router;