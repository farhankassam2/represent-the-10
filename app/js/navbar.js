/*
 Shrinks/grows navbar on scroll based on preset pixel amount
 input: NONE
 returns: NONE
 */
$(window).scroll(function() {
    if ($(document).scrollTop() > 200) {
        $(".navbar-brand").removeClass("tilt");
         $('.nav-text').hide(200);
    } else {
        $(".navbar-brand").addClass("tilt");
         $('.nav-text').show(200);
    }
});

/*
 Applies the "active" class to nav elements that have an href to the current page
 input: NONE
 returns: NONE
 */
$(document).ready(function() {
    $("nav [href]").each(function() {
        if (this.href.split("?")[0] == window.location.href.split("?")[0]) {
            $(this).addClass("active");
        }
    });
});