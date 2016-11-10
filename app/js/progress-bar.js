/*
 Gets the number of entries in the petition Google Doc and sets the progress bar as a percentage of the way to complete.
 input: NONE
 returns: NONE
 */
$(document).ready(function() {
    var MAXCOUNT = 500;

    // TODO: actually get count here
    var getCount = 138;

    // Don't have to round to int because using percentage
    var percentage = (getCount / MAXCOUNT) * 100;

    document.getElementById("progress-bar-content").style.width = percentage + "%";
});

/*
 Clicking on one of the progress bar milestones shows details for that milestone and hides the rest.
 input: NONE
 returns: NONE
 */
$('.progress-btn').click(function() {
    var target = "#" + $(this).attr('id') + "-info";
    $(target).show('slow', function() {
        // Animation complete.
    });
    $(target).siblings("div").hide('slow', function() {
        // Animation complete.
    });
});