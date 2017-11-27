'use strict';

$( document ).on( 'ready', function () {

tilerendition.imagerendition();

/*
    $('.alternate-tileText').each(function(){
var thisobj = $(this);
        $(this).find(".tile-block").click(function(){
			var link= thisobj.attr("href");
            if(!thisobj.hasClass("tile-video")){
                //alert(thisobj.attr('data-target'))
            	//window.location.href = link;
				//$(thisobj).attr('target', '_blank');
                if(thisobj.attr('data-linktarget')=='true'){
					window.open(link);
                }
                else {
					window.location.href = link;
                }
            }
        });




  // make sure the copy blocks are all the same height
  //tilemodules.alignModule();



});*/
});
var tilemodules = {
    maxHeight: '',
    tileBlockHeight: '',
    copyBlockHeight: '',
    titleHeight: '',

    // make all tilemodules the same height
    alignModule: function () {
        
        var gridBases = $('.row.gridbase');

        var setHeights = function (gridbase) {
            tilemodules.tileBlockHeight = tilemodules.copyBlockHeight = tilemodules.titleHeight = 0;

            var tileMod = gridbase.find('.alternate-tileText');
            tileMod.each( function () {
                //tilemodules.tileBlockHeight = Math.max(tilemodules.tileBlockHeight, $(this).find( '.tile-block' ).css('height', 'auto').outerHeight());
                //tilemodules.copyBlockHeight = Math.max(tilemodules.copyBlockHeight, $( this ).find( '.copy-block' ).css('height', 'auto').outerHeight());
                tilemodules.titleHeight = Math.max(tilemodules.titleHeight, $(this).find('.tile-title').children().first().css('height', 'auto').outerHeight());

            });


        if ( matchMedia( '(min-width: 768px)' ).matches ) {
            var nearestTileRow = tileMod.closest( '.row.gridbase' );
                //nearestTileRow.find( '.alternate-tileText .copy-block' ).css( 'height', tilemodules.copyBlockHeight + 'px' );
                if ( tilemodules.titleHeight === 0 ) {
                    return false;
                } else {
                   nearestTileRow.find('.a-tile-title').css('height', tilemodules.titleHeight + 'px');
                    nearestTileRow.find('.overlayTitle .tile-title').css('height', 'auto');
                    nearestTileRow.find('.overlayAll .tile-title').css('height', 'auto');
                    //nearestTileRow.find('.tile').css('min-height',tilemodules.tileBlockHeight + 'px');
                }
                
        } else if( matchMedia( '(max-width: 767px)' ).matches ) {
            var nearestTileRow = tileMod.closest( '.row.gridbase' );
                //nearestTileRow.find( '.alternate-tileText .copy-block' ).css( 'height', tilemodules.copyBlockHeight + 'px' );

                if ( tilemodules.titleHeight === 0 ) {
                    return false;
                } else { 
                    nearestTileRow.find('.a-tile-title').css('height', tilemodules.titleHeight + 'px');
                    nearestTileRow.find('.overlayTitle .tile-title').css('height', 'auto');
                    nearestTileRow.find('.overlayAll .tile-title').css('height', 'auto');
                    //nearestTileRow.find('.tile').css('min-height',tilemodules.tileBlockHeight + 'px');
                }

        }
            else {
                $( '.alternate-tileText .copy-block' )
                    .removeAttr( 'style' );
            }
        };

        gridBases.each(function () {
            setHeights($(this));
        });
        //alert("HI");
        // this needs to work per row gridbase, and we're good

    }
};
var tilerendition={

	imagerendition : function(){
  
        	var winWidth = $( window ).width();
        $(".tileImg").each(function(){
        	var imageReferenceXS = $(this).attr("data-imageReferenceXSPath");
            var imageReferenceSM = $(this).attr("data-imageReferenceSMPath");
            var imageReferenceMD = $(this).attr("data-imageReferenceMDPath");
            var imageReference   = $(this).attr("data-style");
			var isMobileImage= $(this).attr("data-isMobileImage");
			var isTabletImage= $(this).attr("data-isTabletImage");
            var isDesktopImage= $(this).attr("data-isDesktopImage");
            var isBigDesktopImage= $(this).attr("data-isBigDesktopImage");
  

		if(winWidth >0 &&  winWidth <768){
			if(isMobileImage == "true"){
				$(this).attr("data-style","background-image:url("+imageReferenceXS+")");
                $(this).attr("style","background-image:url("+imageReferenceXS+")");
			}
            else{
				$(this).attr("data-style","");
            }
		}
		else if(winWidth >=768 &&  winWidth <992){
			if(isTabletImage == "true"){
				$(this).attr("data-style","background-image:url("+imageReferenceSM+")");
                $(this).attr("style","background-image:url("+imageReferenceSM+")");
			}
			else{ 
				$(this).attr("data-style","");
            }
		}
		else if(winWidth >=992 &&  winWidth <1200){
			if(isDesktopImage == "true"){
				$(this).attr("data-style","background-image:url("+imageReferenceMD+")");
                $(this).attr("style","background-image:url("+imageReferenceMD+")");
			}
            else{
				$(this).attr("src","");
            }
		}
		else if(winWidth >= 1200){
			if(isBigDesktopImage == "true"){
				$(this).attr("data-style",imageReference);
                $(this).attr("style",imageReference);
			}
            else{
				$(this).attr("data-style","");
            }
		}
		

   });

} 
};
$( window ).on( 'resize', function () {
  // make sure the copy blocks are all the same height
   //tilemodules.alignModule();
   tilerendition.imagerendition();

});