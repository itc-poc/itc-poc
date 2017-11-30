/*global $, console, alert, window, document, use, granite, matchMedia */

'use strict';



var tilerendition={

	imagerendition : function(){
  
        	var winWidth = $( window ).width();
        $(".tileImg").each(function(){
        	var imageReferenceXS = $(this).attr("data-imageReferenceXSPath");
            var imageReferenceSM = $(this).attr("data-imageReferenceSMPath");
            var imageReferenceMD = $(this).attr("data-imageReferenceMDPath");
            var imageReference   = $(this).attr("src");
			var isMobileImage= $(this).attr("data-isMobileImage");
			var isTabletImage= $(this).attr("data-isTabletImage");
            var isDesktopImage= $(this).attr("data-isDesktopImage");
            var isBigDesktopImage= $(this).attr("data-isBigDesktopImage");
  

		if(winWidth >0 &&  winWidth <768){
			if(isMobileImage == "true"){
				$(this).attr("src",imageReferenceXS);
			}
            else{
				$(this).attr("src","");
            }
		}
		else if(winWidth >=768 &&  winWidth <992){
			if(isTabletImage == "true"){
				$(this).attr("src",imageReferenceSM);
			}
			else{
				$(this).attr("src","");
            }
		}
		else if(winWidth >=992 &&  winWidth <1200){
			if(isDesktopImage == "true"){
				$(this).attr("src",imageReferenceMD);
			}
            else{
				$(this).attr("src","");
            }
		}
		else if(winWidth >= 1200){
			if(isBigDesktopImage == "true"){
				$(this).attr("src",imageReference);
			}
            else{
				$(this).attr("src","");
            }
		}
		

   });

} 
};

$( document ).on( 'ready', function () {
   
tilerendition.imagerendition();

});
$( window ).on( 'resize', function () {
  // make sure the copy blocks are all the same height
   tilerendition.imagerendition();

});