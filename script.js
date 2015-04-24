var i = 0;
var color;
var colorDiv;

$(document).ready(function(){

    $('#generate').on('click',function(){
        i++;
        $('body').append("<div class='line'>Line #"+i+
            "<div class='changeColor'>Change Color</div><div class='remove'>Remove</div></div>");

        $('.changeColor').last().on('click',function(){

            colorDiv = $(this).parents('.line');
            color = colorDiv.css('background-color');

            //alert(color);

            if(color == 'rgb(255, 69, 0)') {
                colorDiv.css('background-color', 'white');
            }
            else {
                colorDiv.css('background-color', 'orangered');
            };
        });

        $('.remove').last().on('click',function(){
            $(this).closest('.line').remove();
        });
    });



});