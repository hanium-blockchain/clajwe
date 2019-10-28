$(function() {
  $('.isHide').hide();
  $('.assignBtn').attr("disabled", true);
  $('.managerListTable tr').click(function(){
    $('.isHide').hide();
    var idx = $('.showDetailLine').index(this);
    var content = $('.detailContent:eq('+idx+')');
    var cname = content.attr('class');
    if (cname.indexOf('isHide') > -1) {
      content.removeClass('isHide');
      content.addClass('clicked');
      content.show();
    }
    if (cname.indexOf('clicked') > -1) {
      content.removeClass('clicked');
      content.hide();
    }
    content.addClass('isHide');
    $('.assignBtn:eq('+idx+')').attr("disabled", false);
  });

  // 각 투자리스트 평가리스트에서 상세 내역으로 이동
  $('.eval_investTable tr.investList').click(function(){
    var idx = $(this).attr('idNum');
    var url = '/investment/detail/'+idx
    location.href=url
  });
  $('.eval_investTable tr.evalList').click(function(){
    var idx = $(this).attr('idNum');
    var url = '/evaluations/detail/'+idx
    location.href=url
  });

  // 매니저가 투자 리스트에 넣을지 승인 해줌
  $('.assignListTable tr.investList').click(function(){
    var idx = $(this).attr('idNum');
    var url = '/investment/detail/'+idx
    location.href=url
  });

  $('.assignBtn').click(function() {
    var $el = $(e.currentTarget);

    $.ajax({
      url: '/007/assign/'+ $el.data('evalId'),
      method: 'POST',
      dataType: 'json',
      success: function(data) {
        console.log('평가자 승인 성공~~~~');
        console.log(data);
        $el.hide();
      },
      error: function() {
        alert('실패~~~!');
      },
      complete: function(data) {
      }
    })
  })


  // $('체크박스 클릭하는거는 찾아보기').click(function(){
  //   if (체크박스 값 == true) {
  //     $('.evalDropDown').hide();
  //   }else {
  //     $('.evalDropDown').show();
  //   }
  // });
  


});


