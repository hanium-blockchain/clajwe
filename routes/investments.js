var express = require('express');
var router = express.Router();

router.get('/detail', function(req, res, next){
    const asset = {
        name : '아파아파트',
        number: '112233',
        address: '서울시 강남구 어쩌구',
        area: 11223333,
        complete_date: '2010-01-01',
        description: '주변에 편의시설이 많음. 지하철 역에서 10분거리. 화장실 ',
        end_date: '2020-05-05',
    }
    
    res.render('detail/detail_context', {asset: asset});
});


module.exports = router;