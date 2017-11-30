'use strict';


var sectionRendition = {
    	imagerendition : function(){

        	var winWidth = $( window ).width();
        $(".sectionImg").each(function(){
        	var imageReferenceXS = $(this).attr("data-imageReferenceXSPath");
            var imageReferenceSM = $(this).attr("data-imageReferenceSMPath");
            var imageReferenceMD = $(this).attr("data-imageReferenceMDPath");
            var imageReference   = $(this).attr("data-style");
			var isMobileImage= $(this).attr("data-isMobileImage");
			var isTabletImage= $(this).attr("data-isTabletImage");
            var isDesktopImage= $(this).attr("data-isDesktopImage");
            var isBigDesktopImage= $(this).attr("data-isBigDesktopImage");
            var sectionbgcolor= "#"+$(this).attr("data-sectionbgcolor");
            //alert(imageReference);
  

		if(winWidth >0 &&  winWidth <768){ 
			if(isMobileImage == "true"){

				$(this).attr("data-style","background-image:url("+imageReferenceXS+")");
                //$(this).attr("style","background-image:url("+imageReferenceXS+")");
                //$(this).attr("style","background: "+sectionbgcolor+" url("+imageReferenceXS+") no-repeat ");
                //$(this).css("background-image", sectionbgcolor+" url("+imageReferenceXS+") no-repeat ");
                $(this).attr("style", $(this).attr("data-style"));
                $(this).css({'background-repeat' : 'no-repeat','background-size' : 'cover','min-height':$(this).data('minheightcheck')});
			}
            else{
				$(this).attr("data-style","");
                $(this).attr("style","");
                $(this).css("background-color",sectionbgcolor);
                $(this).css({'background-repeat' : 'no-repeat','background-size' : 'cover','min-height':$(this).data('minheightcheck')})
            }
		}
		else if(winWidth >=768 &&  winWidth <992){
			if(isTabletImage == "true"){
				$(this).attr("data-style","background-image:url("+imageReferenceSM+")");
                //$(this).attr("style","background-image:url("+imageReferenceSM+")");
                //$(this).css("background-image",sectionbgcolor+" url("+imageReferenceSM+") no-repeat ");
				$(this).attr("style", $(this).attr("data-style"));
                $(this).css({'background-repeat' : 'no-repeat','background-size' : 'cover','min-height':$(this).data('minheightcheck')})
			}
			else{
				$(this).attr("data-style","");
                $(this).attr("style","");
                $(this).css("background-color",sectionbgcolor);
                $(this).css({'background-repeat' : 'no-repeat','background-size' : 'cover','min-height':$(this).data('minheightcheck')})
            }
		}
		else if(winWidth >=992 &&  winWidth <1200){
			if(isDesktopImage == "true"){
				$(this).attr("data-style","background-image:url("+imageReferenceMD+")");
                //$(this).attr("style","background-image:url("+imageReferenceMD+")");
                //$(this).css("background-image",sectionbgcolor+" url("+imageReferenceMD+") no-repeat ");
				$(this).attr("style", $(this).attr("data-style"));
                $(this).css({'background-repeat' : 'no-repeat','background-size' : 'cover','min-height':$(this).data('minheightcheck')})
			}
            else{
				$(this).attr("data-style","");
                $(this).attr("style","");
                $(this).css("background-color",sectionbgcolor);
                $(this).css({'background-repeat' : 'no-repeat','background-size' : 'cover','min-height':$(this).data('minheightcheck')})
            }
		}
		else if(winWidth >= 1200){
			if(isBigDesktopImage == "true"){
				$(this).attr("data-style",imageReference);
				$(this).attr("style", $(this).attr("data-style"));
                $(this).css("background-color",sectionbgcolor);
                $(this).css({'background-repeat' : 'no-repeat','background-size' : 'cover','min-height':$(this).data('minheightcheck')})
			}
            else{
				$(this).attr("data-style","");
                $(this).attr("style","");
                $(this).css("background-color",sectionbgcolor);
                $(this).css({'background-repeat' : 'no-repeat','background-size' : 'cover','min-height':$(this).data('minheightcheck')})
            }
		}
		

   });
            $('.section-styles.dummyrgbaClass').each(function(){                

                $(this).css('background-color',$(this).data('rgbacheck'));
                $(this).css('min-height',$(this).data('minheightcheck'));
            });

} 
};

$( document ).on( 'ready', function () {
    sectionRendition.imagerendition();
});

$( window ).on( 'resize', function () {
    sectionRendition.imagerendition();

});
$( window ).on( 'scroll', function () {  
  //sectionRendition.imagerendition();
});