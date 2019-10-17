$(function(){
    $('.address1').change(function(){
        // if($('.address1 option:selected').val() == "서울특별시"){
        //     $('.address1').hide();
        // }
        // else if($('.address1 option:selected').val() == "부산광역시"){
        //     $('.address1').hide();
        // }
        switch($('.address1 option:selected').val()) {
            case "서울특별시" : 

                var optSize = $('.address2 option').size();
                if(optSize > 1){
                    $('.address2').find('option').remove().end();
                    var defaultOpt = new Option("시/군/구");
                    $('.address2').append(defaultOpt);
                }

                var options = ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구'
                , '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중량구'];

                options.forEach(function (item, index, array){
                    var opt = new Option(item, item);
                    $('.address2').append(opt);
                });

                break;

            case "부산광역시" : 

                var optSize = $('.address2 option').size();
                if(optSize > 1){
                    $('.address2').find('option').remove().end();
                    var defaultOpt = new Option("시/군/구");
                    $('.address2').append(defaultOpt);
                }

                var options = ['1111', '2222'];

                options.forEach(function (item, index, array){
                    var opt = new Option(item, item);
                    $('.address2').append(opt);
                });


                break;
            case "대구광역시" : 
                break;
        }
    })
})