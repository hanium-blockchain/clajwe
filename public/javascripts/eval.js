$(function(){
   $('.evalInput').on('change keyup paste', function(){
       var evalValue = $('.evalInput').val();
       $('.coinLabel').text(evalValue*0.01);
   });


  

});

