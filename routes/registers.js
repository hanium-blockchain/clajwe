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
    var address = form.address1 + ' ' + form.address2 + ' ' + form.address3;
    var area = form.area || 0;
    var completeDate = form.completeYear + '년 ' + form.completeMonth + '월 ' + form.completeDay + '일';
    var description = form.description;
    var endDate = form.endYear + '년 ' + form.endMonth + '월 ' + form.endDay + '일'; 

    console.log(address);
    console.log(completeDate);
    console.log(endDate);

    if(!name) return 'Name is required';
    if(!number) return 'Number is required';
    if(!area) return 'area is required';
    if(!description) return 'Description is required';
    
    return null;
}

router.get('/new', function(req, res, next){
    res.render('detail/new_register');
});


router.post('/request_register', (req, res, next) => {
    const user = {
        userid: 'userid',
        name: '등록자',
    }

    console.log(req.body);

    var err = validateRegisterForm(req.body);
    


    res.redirect('back');
});



module.exports = router;