$(document).ready(function() {
    $('.tab a').click(function() {
        $('.pic img').eq($(this).index()).css({ 'opacity': '1' }).siblings().css({ 'opacity': '0' });
    });

});
