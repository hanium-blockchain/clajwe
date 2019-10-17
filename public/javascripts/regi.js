function initOpt(){
    var optSize = $('.address2 option').size();
    if(optSize > 1){
        $('.address2').find('option').remove().end();
        var defaultOpt = new Option("시/군/구");
        $('.address2').append(defaultOpt);
    }
}

function appendOpt(options){
    options.forEach(function (item, index, array){
        var opt = new Option(item, item);
        $('.address2').append(opt);
    });
}

$(function(){
    $('.address1').change(function(){
        initOpt();
        switch($('.address1 option:selected').val()) {
            case "서울특별시" : 
                var options = ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구'
                , '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중량구'];
                appendOpt(options);
                break;
            case "부산광역시" : 
                var options = ['강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구',
                '사하구', '서구', '수영구', '연제구', '영도구', '영도구', '중구', '해운대구'];
                appendOpt(options);
                break;
            case "대구광역시" : 
                var options = ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구']
                appendOpt(options);
                break;
            case "인천광역시" :
                var options = ['강화군', '계양구', '남동구', '동구', '미추홀구', '부평구', '서구', '연수구', '웅진군', '중구'];
                appendOpt(options);
                break;
            case "광주광역시" : 
                var options = ['광산구', '남구', '동구', '북구', '서구'];
                appendOpt(options);
                break;
            case "대전광역시" : 
                var options = ['대덕구', '동구', '서구', '유성구', '중구'];
                appendOpt(options);
                break;
            case "울산광역시" : 
                var options = ['남구', '동구', '북구', '울주군', '중구'];
                appendOpt(options);
                break;
            case "세종특별자치시" :
                var options = ['세종특별자치시'];
                appendOpt(options);
                break;
            case "경기도" :
                break;
            case "강원도" : 
                break;
            case "충청북도" : 
                break;
            case "전라북도" : 
                break;
            case "전라남도" : 
                break;
            case "경상북도" : 
                break;
            case "경상남도" : 
                break;
            case "제주특별자치도" :
                break;
        }
    })
})