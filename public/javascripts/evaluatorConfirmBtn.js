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

  $('.eval_investTable tr.investList').click(function(){
    var idx = $('.investList').index(this);
    var url = '/evaluations/detail/'+idx
    location.href=url
  });
  $('.eval_investTable tr.evalList').click(function(){
    var idx = $('.evalList').index(this);
    var url = '/investments/detail/'+idx
    location.href=url
  });


  // $('체크박스 클릭하는거는 찾아보기').click(function(){
  //   if (체크박스 값 == true) {
  //     $('.evalDropDown').hide();
  //   }else {
  //     $('.evalDropDown').show();
  //   }
  // });
  


});


