var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'testDB',
});

router.get('/new', function(req, res, next){
    res.render('detail/new_register');
});

function validateForm(form){
    var name = form.name || '';
    var number = form.number || 0;
    var address = form.address || '';
    var area = form.area || 0;
    var complete_date = form.complete-date-year || '';
}

router.post('/request_register', (req, res, next) => {
    var err = validateForm(req.body);
})

module.exports = router;