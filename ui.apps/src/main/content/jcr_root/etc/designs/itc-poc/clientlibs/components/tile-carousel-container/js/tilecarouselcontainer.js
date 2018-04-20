$(document).ready(function() {
    $("#startCarousel").on("click", function() {
        $(".genericTile").carouseltCC("cycle")
    });
    $("#stopCarousel").on("click", function() {
        $(".genericTile").carouseltCC("pause")
    });
    $(".tile-carousel-container .genericTile").each(function(x) {
        $(this).attr("id", "myCarousel-generic" + x)
    });
    $(".tile-carousel-container .genericTile").each(function(x) {
        currentCarID = "#" + $(this).attr("id");
        totalItems = $(currentCarID + ".genericTile .carousel-indicators.hiddenLG li").length;
        $(currentCarID + " .carouselSlideInd .currentSlideItems").text("1");
        $(currentCarID + " .carouselSlideInd .totalSlideItems").text(totalItems)
    });
    $(".tile-carousel-container .genericTile").on("slid.bs.carouseltCC", function() {
        if ($(window).width() < 768) {
            currentIndex = $(this).find(" .carousel-indicators.hiddenLG li.active").data("slide-to") + 1;
            $(this).find(" .carouselSlideInd .currentSlideItems").text(currentIndex)
        }
    })
});
var totalItems, selectedID;
var sysWidth = $(window).width();
$(window).load(function() {
    $(".tile-carousel-container .genericTile").each(function(x) {
        $(this).attr("id", "myCarousel-generic" + x)
    });
    tCCInit();
    sysWidth = $(window).width();
    setTimeout(function() {
        if (sysWidth >= 768 && tilecarcDialogConfig.desktopView != "DesktopcarouselView") {
            $("#stopCarousel").trigger("click")
        }
        $('.genericTile a[data-slide="prev"]').on("click keypress", function() {
            selectedID = "#" + $(this).parents(".genericTile").attr("id");
            $(selectedID).carouseltCC("prev")
        });
        $('.genericTile a[data-slide="next"]').on("click keypress", function() {
            selectedID = "#" + $(this).parents(".genericTile").attr("id");
            $(selectedID).carouseltCC("next")
        });
        if ($(".cq-wcm-edit").length > 0) {
            $(".tile-carousel-container .genericTile").each(function(x) {
                currentCarID = "#" + $(this).attr("id");
                $(currentCarID + " .carousel-inner > div").removeClass("active");
                setSameHeight(currentCarID)
            })
        }
    }, 1000)
});
$(window).resize(function() {
    $(".tile-carousel-container .genericTile").each(function(x) {
        $(this).attr("id", "myCarousel-generic" + x)
    });
    tCCInit()
});

function tCCInit() {
    sysWidth = $(window).width();
    $(".tile-carousel-container .genericTile").each(function(x) {
        currentCarID = "#" + $(this).attr("id");
        if (sysWidth >= 768) {
            if ($(currentCarID + ".genericTile .carousel-inner").hasClass("DesktopcarouselView")) {
                $(currentCarID + ".genericTile .carousel-indicators.hiddenXS").show();
                $(currentCarID + ".genericTile .left").show();
                $(currentCarID + ".genericTile .right").show();
                $(currentCarID + ".genericTile .carousel-indicators.hiddenLG").hide();
                $(currentCarID + " .carouselSlideInd").hide();
                $(currentCarID + ".genericTile .carousel-inner").addClass("desktopView").removeClass("tccMobile");
                $("#stopCarousel").trigger("click");
                setTimeout(function() {
                    setEqHtCarousel(currentCarID)
                }, 1000);
                carouselViewInit(currentCarID)
            } else {
                $(currentCarID + ".genericTile .carousel-indicators").hide();
                $(currentCarID + ".genericTile .left").hide();
                $(currentCarID + ".genericTile .right").hide();
                $(currentCarID + " .carouselSlideInd").hide();
                $(currentCarID + ".genericTile .carousel-inner").addClass("desktopView");
                $("#stopCarousel").trigger("click");
                setTimeout(function() {
                    setSameHeight(currentCarID)
                }, 500)
            }
        } else {
            if ($(currentCarID + ".genericTile .carousel-inner").hasClass("carouselView")) {
                $(currentCarID + ".genericTile .carouselSlideInd").show();
                $(currentCarID + ".genericTile .left").show();
                $(currentCarID + ".genericTile .right").show();
                $(currentCarID + ".genericTile .carousel-inner").show();
                $(currentCarID + ".genericTile .carousel-indicators.hiddenXS").hide();
                $(currentCarID + ".genericTile .carousel-indicators.hiddenLG").hide();
                $(currentCarID + " .carousel-indicators.hiddenXS").empty();
                $(currentCarID + ".genericTile .carousel-inner").removeClass("desktopView");
                $(currentCarID + " .carousel-inner > div").removeAttr("style");
                $("#stopCarousel").trigger("click");
                carouselViewInit(currentCarID);
                setEqHtCarousel(currentCarID)
            } else {
                $(currentCarID + ".genericTile .carousel-indicators").hide();
                $(currentCarID + ".genericTile .left").hide();
                $(currentCarID + ".genericTile .right").hide();
                $(currentCarID + " .carouselSlideInd").hide();
                $(currentCarID + ".genericTile .carousel-inner").removeClass("desktopView");
                $(currentCarID + ".genericTile .carousel-inner").show();
                $(currentCarID + " .carousel-inner > div").removeAttr("style");
                $("#stopCarousel").trigger("click");
                for (i = 1; i <= 5; i++) {
                    if ($(currentCarID).find(".tccRow" + i).parent().hasClass("item")) {
                        addItemClass = "item";
                        $(currentCarID).find(".tccRow" + i).removeClass(addItemClass).unwrap("<div class='" + addItemClass + "'></div>");
                        $(currentCarID + " .carousel-indicators li.active").removeClass("active")
                    }
                }
            }
        }
    })
}

function setSameHeight(currentCarID ) {
    divHeight = 100;
    $(currentCarID  + " .carousel-inner > .tccRow1").height(divHeight + "%");
    var row1 = 0;
    $(currentCarID  + " .carousel-inner > .tccRow1").each(function() {
        if (row1 < $(this).height()) {
            row1 = $(this).height()
        }
    });
    $(currentCarID  + " .carousel-inner > .tccRow1").height(row1);
    $(currentCarID  + " .carousel-inner > .tccRow2").height(divHeight + "%");
    var row2 = 0;
    $(f + " .carousel-inner > .tccRow2").each(function() {
        if (row2 < $(this).height()) {
            row2 = $(this).height()
        }
    });
    $(currentCarID  + " .carousel-inner > .tccRow2").height(row2);
    $(currentCarID  + " .carousel-inner > .tccRow3").height(divHeight + "%");
    var row3 = 0;
    $(f + " .carousel-inner > .tccRow3").each(function() {
        if (row3 < $(this).height()) {
            row3 = $(this).height()
        }
    });
    $(f + " .carousel-inner > .tccRow3").height(row3);
    $(f + " .carousel-inner > .tccRow4").height(divHeight + "%");
    var row4 = 0;
    $(f + " .carousel-inner > .tccRow4").each(function() {
        if (row4 < $(this).height()) {
            row4 = $(this).height()
        }
    });
    $(currentCarID + " .carousel-inner > .tccRow4").height(row4);
    $(currentCarID + " .carousel-inner > .tccRow5").height(divHeight + "%");
    var row5 = 0;
    $(currentCarID + " .carousel-inner > .tccRow5").each(function() {
        if (row5 < $(this).height()) {
            row5 = $(this).height()
        }
    });
    $(currentCarID + " .carousel-inner > .tccRow5").height(row5)
}

function setEqHtCarousel(currentCarID) {
    divHeight = 100;
    var rowheightArr = [];
    for (var i = 1; i <= 5; i++) {
        if ($(currentCarID).find(".tccRow" + i).length == 0) {
            break
        }
        $(currentCarID + " .carousel-inner").find(".tccRow" + i).height(divHeight + "%");
        var rowH = 0;
        $(currentCarID + " .carousel-inner .tccRow" + i).each(function() {
            if (rowH < $(this).height()) {
                rowH = $(this).height() + 2
            }
        });
        rowheightArr.push(rowH)
    }
    var maxval = rowheightArr.reduce(function(a, b) {
        return Math.max(a, b)
    });
    if (maxval < 100) {
        maxval = 100
    }
    $(currentCarID + " .carousel-inner").find(".tccRow1").height(maxval);
    $(currentCarID + " .carousel-inner").find(".tccRow2").height(maxval);
    $(currentCarID + " .carousel-inner").find(".tccRow3").height(maxval);
    $(currentCarID + " .carousel-inner").find(".tccRow4").height(maxval);
    $(currentCarID + " .carousel-inner").find(".tccRow5").height(maxval)
}

function carouselViewInit(currentCarID) {
    var addItemClass;
    if ($(currentCarID + ".genericTile .carousel-inner").hasClass("desktopView")) {
        var countIndicators = 0;
        for (i = 1; i <= 5; i++) {
            if ($(currentCarID).find(".tccRow" + i).length == 0) { break }
            if (!$(currentCarID).find(".tccRow" + i).parent().hasClass("item")) {
                i == 1 ? addItemClass = "item active" : addItemClass = "item";
                $(currentCarID).find(".tccRow" + i).removeClass(addItemClass).wrapAll("<div class='" + addItemClass + "'></div>");
                countIndicators++;
                countIndicatorsval = countIndicators - 1;
                if (countIndicators == 1) {
                    $(currentCarID + " .carousel-indicators.hiddenXS").empty();
                    $(currentCarID + " .carousel-indicators.hiddenXS").append("<li data-target='" + currentCarID + "' data-slide-to='" + countIndicatorsval + "' class='active'></li>")
                } else {
                    $(currentCarID + " .carousel-indicators.hiddenXS").append("<li data-target='" + currentCarID + "' data-slide-to='" + countIndicatorsval + "' ></li>")
                }
            }
        }
    } else {
        if (!$(currentCarID + " .carousel-inner").hasClass("tccMobile") && $(currentCarID).find(".item").length != 0) {
            $(currentCarID + " .carousel-inner").addClass("tccMobile"); 
            for (i = 1; i <= 5; i++) {
                totalRowCount = ($(currentCarID + " .item").length == $(currentCarID + " .item .tccRow" + i).length || $(currentCarID + " .item").length == $(currentCarID).find(".tccRow" + i).length) ? true : false;
                if ($(currentCarID).find(".tccRow" + i).length == 0) { break }
                addItemClass = "item";
                $(currentCarID).find(".tccRow" + i).each(function() {
                    if ($(this).parent().hasClass("item")) {
                        $(currentCarID).find(".tccRow" + i).removeClass(addItemClass).unwrap("<div class='" + addItemClass + "'></div>");
                        $(currentCarID + " .carousel-indicators li.active").removeClass("active");
                        $(currentCarID + " .carousel-indicators li").first().addClass("active")
                    }
                });
                if (totalRowCount) {
                    $(currentCarID).find(".tccRow1").first().removeClass(addItemClass + " active").addClass(addItemClass + " active");
                    $(currentCarID).find(".tccRow" + i + ":not(:eq(0))").removeClass(addItemClass + " active").addClass(addItemClass)
                } else {
                    $(currentCarID).find(".tccRow1").first().removeClass(addItemClass + " active").addClass(addItemClass + " active");
                    $(currentCarID).find(".tccRow" + i).not(".tccRow1:eq(0)").removeClass(addItemClass + " active").addClass(addItemClass)
                }
            }
        }
    }
}