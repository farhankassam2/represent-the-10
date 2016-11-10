/*
 Shrinks/grows navbar on scroll based on preset pixel amount
 input: NONE
 returns: NONE
 */
$(window).scroll(function() {
    if ($(document).scrollTop() > 200) {
        $('#navbar-extra').hide('slow', function() {
            // Animation complete.
        });
        $('.nav-text').hide('slow', function() {
            // Animation complete.
        });
    } else {
        $('#navbar-extra').show('slow', function() {
            // Animation complete.
        });
        $('.nav-text').show('slow', function() {
            // Animation complete.
        });
    }
});