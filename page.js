$(document).ready(function(){
    $("input").focus(function(){
        $(this).css("background-color", "#cccccc");
    });
     $("input").blur(function(){
        $(this).css("background-color", "white");
    });
});




$(document).ready(function(){
    $("img").click(function(){
        $(".para1").slideToggle("slow");
    });
});



$('.p1')
  .transition('swing down')
;