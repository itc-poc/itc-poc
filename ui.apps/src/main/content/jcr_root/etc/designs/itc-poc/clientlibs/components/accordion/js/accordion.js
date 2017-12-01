ITC_accordion = function() {
	var initStarted = false;
	var focusableElement = "a[href], input, select, button, textarea";
	var clickedAccordionHeader = null;
	var activeItem;
    var onLoadSetExpandOrCollapseLinks =function(activeItem){
        //feature purpose we added var activeTab = $(".itc-accordion").attr("id");
        if($("#"+activeItem+" .accordionsection a.collapsed").length >=1){
            $("#"+activeItem).siblings(".expand-collapse").find(".collapseAll").addClass("hide");
			$("#"+activeItem).siblings(".expand-collapse").find(".expandAll").removeClass("hide");
        }else{
            $("#"+activeItem).siblings(".expand-collapse").find(".expandAll").addClass("hide");
            $("#"+activeItem).siblings(".expand-collapse").find(".collapseAll").removeClass("hide");
        }
    };
    var switchExpandToCollapseLink = function(activeItem){
		$("#"+activeItem).siblings(".expand-collapse").find(".expandAll").addClass("hide");
        $("#"+activeItem).siblings(".expand-collapse").find(".collapseAll").removeClass("hide");
    };
    var switchCollapseToExpandLink = function(activeItem){
		$("#"+activeItem).siblings(".expand-collapse").find(".collapseAll").addClass("hide");
        $("#"+activeItem).siblings(".expand-collapse").find(".expandAll").removeClass("hide");
    };
    var onClickCollapseAllLink =function(_event){
        activeItem = $(_event.target).parent().siblings(".itc-accordion").attr("id");
		$(".itc-accordion#"+activeItem).find(".collapse").collapse("hide");
		////feature purpose we added $(".itc-accordion").find(".collapse").collapse("hide");
        switchCollapseToExpandLink(activeItem);
    };
    var onClickExpandAllLink =function(_event){
        activeItem = $(_event.target).parent().siblings(".itc-accordion").attr("id");
		$(".itc-accordion#"+activeItem).find(".collapse").collapse("show");
		////feature purpose we added $(".itc-accordion").find(".collapse").collapse("show");
        switchExpandToCollapseLink(activeItem);
    };
	var init = function() {
		if (!initStarted) {
			initStarted = true;
			bindHandlers();
            $(".itc-accordion").each(function(){
                activeItem = $(this).attr("id");
				onLoadSetExpandOrCollapseLinks(activeItem);//console.log($(this).attr("id"))
            });
            ////feature purpose we added onLoadSetExpandOrCollapseLinks();
		}
	};

	var bindHandlers = function() {
		$(document).on('keydown','.itc-accordion-header',function(e) {
			var keyCode = e.keyCode || e.which;

			switch(keyCode) {
				case 13: // Space bar pressed
				case 32: // Enter pressed
					toggleCurrentSection($(this));
                    activeItem=$(this).parents(".itc-accordion").attr("id");
                    onLoadSetExpandOrCollapseLinks(activeItem);
					break;
				case 33: // PageUp pressed
					if (e.metaKey || e.ctrlKey) {
						focusOnPreviousHeader($(this));
					}
					break;
				case 34: // PageDown pressed
					if (e.metaKey || e.ctrlKey) {
						focusOnNextHeader($(this));
					}
					break;
				case 35: // End key pressed
					focusOnLastHeader($(this));
					break;
				case 36: // Home key pressed
					focusOnFirstHeader($(this));
					break;
				case 37: // Left arrow pressed
				case 38: // Up arrow pressed
					focusOnPreviousHeader($(this));
					break;
				case 39: // Right arrow pressed
				case 40: // Down arrow pressed
					focusOnNextHeader($(this));
					break;
				default:
					return true;
			}

			// Prevent default if key is matched
			e.preventDefault();
		});

		$(document).on('keydown','.collapse',function(e) {
			if (e.metaKey || e.ctrlKey) {
				var keyCode = e.keyCode || e.which;

				switch(keyCode) {
					case 33: // PageUp pressed
						focusOnPreviousHeader($(this));
						break;
					case 34: // PageDown pressed
						focusOnNextHeader($(this));
						break;
				}
			}
		});
        $(document).on('keydown','.expand-collapse .collapseAll',function(e) {
			var keyCode = e.keyCode || e.which;
            if(keyCode === 32 || keyCode === 13){
				onClickCollapseAllLink(e);
                $('.expand-collapse .expandAll').focus();
            }
        });
        $(document).on('keydown','.expand-collapse .expandAll',function(e) {
			var keyCode = e.keyCode || e.which;
            if(keyCode === 32 || keyCode === 13){
				onClickExpandAllLink(e);
            }
        });

		$(document).on("focusin", ".itc-accordion-header", function(e) {

			$(".itc-accordion-header").attr("aria-selected", "false");
			$(this).attr("aria-selected", "true");
		});

		$(document).on("focusout", ".itc-accordion-header", function(e) {
			$(this).attr("aria-selected", "false");
		});

		$(document).on("click", ".itc-accordion-header", function(e) {
            activeItem=$(this).parents(".itc-accordion").attr("id");
            onLoadSetExpandOrCollapseLinks(activeItem);
			clickedAccordionHeader = $(this).parent().attr("id");
			collapseOthersIfSingle($(this).attr("data-target"));
		});
		/* start accordian expand collapse changes */
        $(document).on("click", ".expand-collapse .collapseAll", function(e) {
			onClickCollapseAllLink(e);
		});
        $(document).on("click", ".expand-collapse .expandAll", function(e) {
			onClickExpandAllLink(e);
		});
        /* end accordian expand collapse changes */

		$(document).on("shown.bs.collapse", ".collapse", function(e) {
			if (clickedAccordionHeader == getContentsHeader($(this)).parent().attr("id")) {
				// Set focus on first focusable in clicked content section
				  if($(this).hasClass("itc-accordion-header"))
                {
					sectionsFirstFocusable($(this)).focus();
                }				
				clickedAccordionHeader = null;
			}
		});

		$(document).on("hidden.bs.collapse", ".collapse", function(e) {
			$(this).attr("aria-hidden","true");

			if (clickedAccordionHeader == getContentsHeader($(this)).parent().attr("id")) {
				// Set focus back on clicked accordion tab on collapse
				getContentsHeader($(this)).focus();
				clickedAccordionHeader = null;
			}
		});
		$('.accordion .panel-heading').keyup(function(e){
			if(e.keyCode === 32){
			   $('.accordion .panel-heading').next().removeAttr('aria-hidden');
			}
		});
	};

	var sectionsFirstFocusable = function(ele) {
		var eleWithinToFindFocus = ele;
		if (ele.hasClass("itc-accordion-header")) {
			eleWithinToFindFocus = getHeadersContent(ele);
		}

		return eleWithinToFindFocus.find(focusableElement).filter(":visible").first();
	};

	var collapseOthersIfSingle = function(ele) {
		if ($(ele).closest(".itc-accordion").hasClass("single")) {
			$(ele).closest(".itc-accordion").find(".collapse").not(ele).collapse("hide");
		}
	}

	var toggleCurrentSection = function(ele) {
		$(ele.attr("data-target")).collapse("toggle");
		clickedAccordionHeader = ele.parent().attr("id");
		collapseOthersIfSingle(ele.attr("data-target"));
	};

	var focusOnFirstHeader = function(ele) {
		ele.closest(".itc-accordion").children().first().find(".itc-accordion-header").focus();
	};

	var focusOnLastHeader = function(ele) {
		ele.closest(".itc-accordion").children().last().find(".itc-accordion-header").focus();
	};

	var focusOnPreviousHeader = function(ele) {
		var sectionsMainEle = ele.closest(".itc-accordion div.section.accordionsection");

		if (sectionsMainEle.index() > 0) {
			sectionsMainEle.prev().find(".itc-accordion-header").focus();
		} else {
			focusOnLastHeader(ele);
		}
	};

	var focusOnNextHeader = function(ele) {
		var sectionsMainEle = ele.closest(".itc-accordion div.section.accordionsection");

		if (sectionsMainEle.index() < sectionsMainEle.parent().children().length - 1) {
			sectionsMainEle.next().find(".itc-accordion-header").focus();
		} else {
			focusOnFirstHeader(ele);
		}
	};

	var getHeadersContent = function(ele) {
		return $(ele.attr("data-target"));
	};

	var getContentsHeader = function(ele) {
		return $("#" + ele.attr("aria-labelledby")).find(".itc-accordion-header");
	};

	var focusOnNextElementOutsideAccordion = function(ele, shiftKeyPressed) {
		var indexShift = 1;

		if (shiftKeyPressed) {
			focusOnFirstHeader(ele);
			indexShift = -1;
		} else {
			focusOnLastHeader(ele);
		}
		
		var tabables = $(focusableElement).filter("[tabindex != '-1']").filter(":visible");
        var currentIndex = tabables.index($(":focus"));
        tabables.eq(currentIndex + indexShift).focus();
	};

	return {
		init: init
	};
}();

$(function() {
	ITC_accordion.init();
});