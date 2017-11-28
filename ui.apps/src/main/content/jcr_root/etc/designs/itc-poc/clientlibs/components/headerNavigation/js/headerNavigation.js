$(document).ready(function () {
	//Add chevrons in Header based on device width 
    $('.headerStrip .menuList .subDropdownmenu').each(function(index){
        if(window.matchMedia("(max-width: 767px)").matches){
        	$(this).siblings('a').find('i.subMenuchevron').addClass('fa-chevron-right pull-right').removeClass('fa-chevron-down'); 
       	}else{
        	$(this).siblings('a').find('i.subMenuchevron').addClass('fa-chevron-down').removeClass('fa-chevron-right pull-right');
        }
    });

    //Hover Menu in Header for desktop
    $('#megaNav .menuList li.menu-item, #megaNavSecond .menuList li.menu-item').mouseover(function (e) {
        if(window.matchMedia("(max-width: 767px)").matches){e.stopPropagation();}else{
            //$(this).children('a').find('i').addClass('fa-chevron-up').removeClass('fa-chevron-down');
        	$(this).addClass('activeHover').find('.subDropdownmenu').stop(true, true).slideDown(300).addClass('dropdownmenuActive');}
    	}).mouseleave(function (e) {
        if(window.matchMedia("(max-width: 767px)").matches){e.stopPropagation();}else{
            //$(this).children('a').find('i').addClass('fa-chevron-down').removeClass('fa-chevron-up');
            $(this).removeClass('activeHover').find('.subDropdownmenu').stop(true, true).slideUp(300).removeClass('dropdownmenuActive');}
    });

    //On click for tab/mobile and keypress for desktop in header
    $('#megaNav .menuList li.menu-item,#megaNavSecond .menuList li.menu-item').on('keydown click',function(e){
        var dropdownmenu=$(this).find('.subDropdownmenu');
        if(window.matchMedia("(max-width: 767px)").matches){
            if(dropdownmenu.hasClass('dropdownmenuActive')){
                dropdownmenu.animate({left:'-100%'},function(){dropdownmenu.removeClass('dropdownmenuActive')})
            }else{
                dropdownmenu.animate({left:'0px'},'fast').addClass('dropdownmenuActive');
            }
        }else if(e.keyCode===13){
            	dropdownmenu.stop(true, true).slideDown(300).addClass('dropdownmenuActive');
            }
    });
    //Close Menu in Header for desktop
    $('#megaNav .menuList .subdropdownClose,#megaNavSecond .menuList .subdropdownClose').click(function(e){
        if(window.matchMedia("(max-width: 767px)").matches){
            var subdropdownmenu=$(this).parents('.subDropdownmenu');
            if(subdropdownmenu.hasClass('dropdownmenuActive')){
                subdropdownmenu.animate({left:'-100%'},function(){subdropdownmenu.removeClass('dropdownmenuActive')})
        }}
        e.stopPropagation();
    });

    //Toggle search form
    $('#megaNav .searchToggle,#megaNavSecond .searchToggle').on('keydown click',function(e){ 
        var meganavSearch=$(this).parents('.headerStripouter').siblings('.searchStrip');
        var navbarlistslider=$(this).parents('.headerStripouter').find('.navbarListslider');
        if(e.keyCode===13 || e.type==='click'){
            $(meganavSearch).toggle();
            e.preventDefault();
            $(navbarlistslider).animate({left:'-100%'}).removeClass('active');
            if($(meganavSearch).is(':visible') && e.keyCode===13){
            	$(meganavSearch).find('.inputSearch').focus();
            }
        }
    });
    //focus search once search is complete
    $('#megaSearch .searchBtn,#megaSearchSecond .searchBtn').on('keydown click',function(e){
		var searchtoggle=$(this).parents('.searchStrip').siblings('.headerStripouter').find('.navbarListslider .searchToggle');
        if(e.keyCode===9){
        	$(searchtoggle).parents('li.menu-item').focus();
        }
    });
	  //Close menu on exit of last menu item
    $('#megaNav .menuList .subDropdownmenu li:last-child,#megaSearchSecond .menuList .subDropdownmenu li:last-child').on('keydown keypress',function(e){
        if(e.keyCode===9){
            	$(this).parents('.subDropdownmenu').stop(true, true).slideUp(300).removeClass('dropdownmenuActive');
        	}
        });

    //Toggle mobile menu
    $('#megaNav .navIconbar button,#megaNavSecond .navIconbar button').click(function(){
        var meganavSearch=$(this).parents('.headerStripouter').siblings('.searchStrip');
        var navbarlistslider=$(this).parents('.headerStripouter').find('.navbarListslider');
        if($(navbarlistslider).hasClass('active')){            
            $(navbarlistslider).animate({left:'-100%'}).removeClass('active');
        }else{
            $(meganavSearch).hide();
            $(navbarlistslider).animate({left:'0px'}).addClass('active');
        }
    })

});
//on scroll, header to be in fixed position
$(window).scroll(function(){
    if ($(window).scrollTop() >= 20) {$('#megaNavSecond').addClass('fixedHeader');} else {$('#megaNavSecond').removeClass('fixedHeader');}
});

$(window).resize(function() {
    if(window.matchMedia("(max-width: 767px)").matches){
        $('.subMenuchevron').addClass('fa-chevron-right pull-right').removeClass('fa-chevron-down');
    }else{
        $('.subMenuchevron').addClass('fa-chevron-down').removeClass('fa-chevron-right pull-right');
        $('.menuList li.menu-item .subDropdownmenu').hide();
        $('.headerStripouter .navbarListslider').removeAttr('style');
        $('.headerStripouter .menuList li.menu-item.open').removeClass('open');
    }
});