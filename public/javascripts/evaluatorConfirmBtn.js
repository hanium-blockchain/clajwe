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
    var url = '/investments/detail/'+idx
    location.href=url
  });
  $('.eval_investTable tr.evalList').click(function(){
    var idx = $(this).attr('idNum');
    var url = '/evaluations/detail/'+idx
    location.href=url
  });

  // 마이페이지 
  $('.inv_mypageTable tr.myInvList').click(function(){
    var idx = $(this).attr('idNum');
    var url = '/investments/detail_inv/'+idx
    location.href=url
  });

  $('.ast_mypageTable tr.myAstList').click(function(){
    var idx = $(this).attr('idNum');
    
    var url = '/investments/detail_my/'+idx
    location.href=url

  });

  // 매니저가 투자 리스트에 넣을지 승인 해줌
  $('.assignListTable tr.investList').click(function(){
    var idx = $(this).attr('idNum');
    var url = '/investments/detail/'+idx
    location.href=url
  });

  $('.assignBtn').click(function(e) {
    var $el = $(e.currentTarget);
    // console.log($el.data('evalid'))
    $.ajax({
      url: '/007/assign/'+ $el.data('evalid'),
      method: 'POST',
      dataType: 'json',
      success: function(data) {
        console.log('평가자 승인 성공~~~~');
        // console.log(data);
        $el.hide();
      },
      error: function() {
        alert('실패~~~!');
      },
      complete: function(data) {
      }
    })
  });

  $('.makeToken').click(function(e) {
    $.ajax({
      url: '/007/makeToken',
      method: 'POST',
      dataType: 'json',
      success: function(data) {
        console.log('평가자 승인 성공~~~~');
        // console.log(data);
      },
      error:function(request,status,error){
        // console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
      },
      complete: function(data) {
      }
    })
  })
});


