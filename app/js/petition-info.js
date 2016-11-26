/*
 Clicking on one of the language buttons shows petition description in that language and hides the rest.
 input: NONE
 returns: NONE
 */
$(".petition-btn").click(function(){
    var target = '#' + $(this).attr('rel');
    $(target).show('slow');
    $(target).siblings("div").hide('slow');
});
