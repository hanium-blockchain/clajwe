var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', function(req, res, next) {
  res.render('user/login');
});

router.get('/signin', (req, res, next) => {
  res.render('user/signin');
});



router.post('/users/requestsignin', (req, res, next) => {
  var err = validateForm(req.body);
  if(err){
    req.flash('danger', err);
    return res.redirect('back');
  }
  connection.connect(function(err) {
    if(err){
      console.log(err);
      console.log('connection error!!!!!');
    }
    console.log('success!!!!!')
    var sql = "INSERT INTO users(user_id, pw, name, email, phone) VALUES (?, ?, ?, ?, ?);"
    var params = [req.body.id, req.body.password, req.body.name, req.body.email, req.body.phone];
    connection.query(sql, params, function(err, result){
      if(err){
        console.log(err);
        console.log('data insert error!!!!!');
        return;
      }
      console.log('insert success!!!');
      console.log(result.affectedRows);
    })
  });

  req.flash('success', 'Registered successfully');
  res.redirect('back');

});




module.exports = router;