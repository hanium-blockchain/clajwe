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
    var area = form.area || 0;
    var description = form.description || '';

    if(!name) return 'Name is required';
    if(!number) return 'Number is required';
    
    if(form.address1 == '시/도') return 'address1 is not selected';
    if(form.address2 == '시/군/구') return 'address2 is not selected';

    if(form.completeYear == 'YYYY') return 'completeYear is not selected';
    if(form.completeMonth == 'MM') return 'completeMonth is not selected';
    if(form.completeDay == 'DD') return 'completeDay is not selected';

    if(form.endYear == 'YYYY') return 'endYear is not selected';
    if(form.endMonth == 'MM') return 'endMonth is not selected';
    if(form.endDay == 'DD') return 'endDay is not selected';

    if(!area) return 'area is required';
    if(!description) return 'Description is required';
    
    return null;
}

router.get('/new', function(req, res, next){
    res.render('detail/new_register');
});


router.post('/request_register', (req, res, next) => {
    const user = {
        public_key: 'pk2'
    }

    console.log(req.body);

    var err = validateRegisterForm(req.body);
    if(err){
        console.log(err);
        console.log('register form error!!!');
        return res.redirect('back')
    }
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    today = yyyy + '년 ' + mm+ '월 ' + dd + '일';
    var address = req.body.address1 + ' ' + req.body.address2 + ' ' + req.body.address3;
    var completeDate = req.body.completeYear + '년 ' + req.body.completeMonth + '월 ' + req.body.completeDay + '일';
    var endDate = req.body.endYear + '년 ' + req.body.endMonth + '월 ' + req.body.endDay + '일'; 

    
    connection.connect(function(err) {
        if(err){
            console.log(err);
            console.log('connection error!!!');
            return res.redirect('back');
        }
        console.log('connectoin success!!!')
        var sql = "INSERT INTO assets(user_id, address, category, asset_no, asset_name, area, completion_date, description, date, end_date) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
        var params = [user.public_key, address, req.body.category, req.body.number, req.body.name, req.body.area, completeDate, req.body.description, today, endDate];
        connection.query(sql, params, function(err, result){
            if(err){
                console.log(err);
                console.log('data insert error!!!');
                return;
            }
            console.log('insert success!!!');
        })
    })
    
    res.redirect('back');
});



module.exports = router;