$(function(){
   $('.evalInput').on('change keyup paste', function(){
       var evalValue = $('.evalInput').val();
       $('.coinLabel').text(evalValue*0.01);
   });
});

$(document).ready(function(){

    var sample = $('.sample_date').html();
    var assetDate = new Date(sample);

    var dd = assetDate.getDate();
    var mm = assetDate.getMonth() + 1;
    var yyyy = assetDate.getFullYear();

    $('.sample_date').html(yyyy + '-' + mm + '-' + dd);

});