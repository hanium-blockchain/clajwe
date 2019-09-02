var express = require('express');
var router = express.Router();

router.get('/new', function(req, res, next){
    res.render('detail/new_register');
});

module.exports = router;