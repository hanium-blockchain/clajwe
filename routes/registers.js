var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'testDB',
});

function validateRegisterForm(form){
    var name = form.name || '';
    var number = form.number || 0;
    var address = form.address || '';
    var area = form.area || 0;
    var complete_date = form.complete-date-year || '';
    var description = form.description || '';
    var end_date = form.end-date-year || '';

    if(!name){ return 'Name is required'; }
    if(!number) { return 'Number is required'; }
    if(!address) { return 'Address is required'; }
    if(!area) { return 'Area is required'; }
    if(!complete_date) { return 'Complete-date is required'; }
    if(!description) { return 'Description is required'; }
    if(!end_date) { return 'End-date is required'; }
    
    return null;
}

router.get('/new', function(req, res, next){
    res.render('detail/new_register');
});





router.post('/request_register', (req, res, next) => {
    var err = validateRegisterForm(req.body);
    if(err){
        req.flash('danger', err);
        return res.redirect('back');
    }
    connection.connect(function(err){
        if(err){
            console.log(err);
            console.log('connection error!!');
        }
        console.log('connection success!');

    });
    console.log(req.body);
    req.flash('success', 'register success!');
    res.redirect('back');
});



module.exports = router;