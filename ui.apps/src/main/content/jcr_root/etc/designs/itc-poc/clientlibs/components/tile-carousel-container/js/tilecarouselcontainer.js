$(document).ready(function() {
$('#myCarousel-generic').carousel({
        interval:3000,
        pause: "false"
    });
    $('#startCarousel').on("click", function() {
        $('#myCarousel-generic').carousel('cycle');
    });
    $('#stopCarousel').on("click", function() {
        $('#myCarousel-generic').carousel('pause');
    });

});
$(window).load(function() {

    var sysWidth = $(window).width();

    if (sysWidth >= 768) {
                                $('#stopCarousel').trigger("click");
                                $('.genericTile .carousel-indicators, .genericTile .left, .genericTile .right').hide();
        $('.genericTile .carousel-inner').addClass('desktopView');
        setSameHeight();
    } else {
        if ($(".genericTile .carousel-inner").hasClass('stackView')) {
            $('.genericTile .carousel-indicators, .genericTile .left, .genericTile .right').hide();
            $('#stopCarousel').trigger("click");
        }

    }
                $('.genericTile a[data-slide="prev"]').on("click", function() {
            $('#myCarousel-generic').carousel('prev');
                });

                $('.genericTile a[data-slide="next"]').on("click", function() {
                                $('#myCarousel-generic').carousel('next');
                });

    setTimeout(function() { 
        if ($(".cq-wcm-edit").length > 0) {
            $("#myCarousel-generic .carousel-inner > div").removeClass('active');
            setSameHeight();
        }
    }, 1000); 


});
$(window).resize(function() {
    var sysWidth = $(window).width();
    if ($(".genericTile .carousel-inner").hasClass('carouselView')) {
        if (sysWidth >= 768) {
            $('.genericTile .carousel-indicators, .genericTile .left, .genericTile .right').hide();
            $('.genericTile .carousel-inner').addClass('desktopView');
            $('#stopCarousel').trigger("click");
            setSameHeight();
        } else {
            $('.genericTile .carousel-indicators, .genericTile .left, .genericTile .right, .genericTile .carousel-inner').show();
            $('.genericTile .carousel-inner').removeClass('desktopView');
            $("#myCarousel-generic .carousel-inner > div").removeAttr("style");
            $('#startCarousel').trigger("click");

        }
    }
    if ($(".genericTile .carousel-inner").hasClass('stackView')) {
        if (sysWidth >= 768) {
            $('.genericTile .carousel-indicators, .genericTile .left, .genericTile .right').hide();
            $('.genericTile .carousel-inner').addClass('desktopView');
            $('#stopCarousel').trigger("click");
            setSameHeight();
        } else {
            $('.genericTile .carousel-indicators, .genericTile .left, .genericTile .right').hide();
            $('.genericTile .carousel-inner').removeClass('desktopView');
            $('.genericTile .carousel-inner').show();
            $("#myCarousel-generic .carousel-inner > div").removeAttr("style");
            $('#stopCarousel').trigger("click");
        }
    }
});

function setSameHeight() {
    divHeight = 100;
    /* for row1 */
    $("#myCarousel-generic .carousel-inner > .tccRow1").height(divHeight + '%');
    var row1 = 0;
    $("#myCarousel-generic .carousel-inner > .tccRow1").each(function() {
        if (row1 < $(this).height()) {
            row1 = $(this).height()
        }
    });

    $("#myCarousel-generic .carousel-inner > .tccRow1").height(row1);


    /* for row2 */
    $("#myCarousel-generic .carousel-inner > .tccRow2").height(divHeight + '%');
    var row2 = 0;
    $("#myCarousel-generic .carousel-inner > .tccRow2").each(function() {
        if (row2 < $(this).height()) {
            row2 = $(this).height()
        }
    });
    $("#myCarousel-generic .carousel-inner > .tccRow2").height(row2);

    /* for row3 */
    $("#myCarousel-generic .carousel-inner > .tccRow3").height(divHeight + '%');
    var row3 = 0;
    $("#myCarousel-generic .carousel-inner > .tccRow3").each(function() {
        if (row3 < $(this).height()) {
            row3 = $(this).height()
        }
    });
    $("#myCarousel-generic .carousel-inner > .tccRow3").height(row3);

    /* for row4 */
    $("#myCarousel-generic .carousel-inner > .tccRow4").height(divHeight + '%');
    var row4 = 0;
    $("#myCarousel-generic .carousel-inner > .tccRow4").each(function() {
        if (row4 < $(this).height()) {
            row4 = $(this).height()
        }
    });
    $("#myCarousel-generic .carousel-inner > .tccRow4").height(row4);

    /* for row5 */
    $("#myCarousel-generic .carousel-inner > .tccRow5").height(divHeight + '%');
    var row5 = 0;
    $("#myCarousel-generic .carousel-inner > .tccRow5").each(function() {
        if (row5 < $(this).height()) {
            row5 = $(this).height()
        }
    });
    $("#myCarousel-generic .carousel-inner > .tccRow5").height(row5);
}
