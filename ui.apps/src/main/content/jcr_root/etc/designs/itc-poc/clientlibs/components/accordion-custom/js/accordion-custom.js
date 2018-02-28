$(document).ready(function() {
    if ($(".multiAccordion").length > 0) {
        $("#myList li a").attr('href', 'javascript:void(0)');
        $("#myList li a").removeAttr('target');
    }
	
    var limitIntLi = parseInt($("#myList").attr('data-limitli'));
    var limitLiTotal = parseInt($("#myList").attr('data-li-total'));
	var liActiveBg = '#' + $("#myList").attr('data-activebg');
	var liActivefont = '#' +  $("#myList").attr('data-activefont');
	var liBg = '#' + $("#myList").attr('data-bg');
	var lifont = '#' +  $("#myList").attr('data-font');
	
	var liActiveBtnBg = '#' + $("#loadMore").attr('data-hoverbg');
	var liActiveBtnfont = '#' +  $("#loadMore").attr('data-hoverfont');
	var btnBg = '#' + $("#loadMore").attr('data-btnbg');
	var btnfont = '#' +  $("#loadMore").attr('data-btnfont');
	if(limitIntLi >= limitLiTotal)
    {
        $("#loadMore").css({'display': 'none'});
    }
    var clone = $("#myList > li").slice(limitIntLi);
    clone.appendTo(".hideElement ul");
    $("#myList > li").slice(limitIntLi).remove();

    $('.more').click(function() {
        $('#Display').toggleClass('showElement');
        $(this).toggleClass('less');
    });

    $(".multiAccordion").on("click", function() {
        if ($(this).hasClass("isActive")) {
            $(this).removeClass("isActive");
			$(this).css({'background-color': liBg});
			$(this).find("a").eq(0).css({'color': lifont});
            $(this).find(".levelContainer").slideUp();
        } else {
            $(".multiAccordion").removeClass("isActive").find(".levelContainer").slideUp();
			$(".multiAccordion").css({'background-color': liBg});
			$(".multiAccordion > a").css({'color': lifont});
			
            $(this).addClass("isActive");
			$(this).css({'background-color': liActiveBg});
			$(this).find("a").eq(0).css({'color': liActivefont});
			
            $(this).find(".levelContainer").slideDown();
        }
		
    });
    $(".multiAccordion div").on("click", function() {
        return false
    });
	
	/* Tab active change backgrounfd color */
	$("#loadMore").hover(function(){
		$(this).css({'background-color': liActiveBtnBg, 'color': liActiveBtnfont});
	}, function(){
		$(this).css({'background-color': btnBg, 'color': btnfont});
	});

});