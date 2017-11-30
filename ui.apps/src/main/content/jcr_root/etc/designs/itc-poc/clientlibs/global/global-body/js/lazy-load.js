/*global $, console, alert, window, document, use, granite */

'use strict';

// lazy loading images
var lazyLoad = {

  offsets: [],
  windowHeight: $( window ).height(),

  // update where the images are in relation to the top of the page
  updateImageOffsets: function () {

    $( '.lazy-loader' ).each( function () {
      var thisImageOffset = $( this ).offset().top;
      lazyLoad.offsets.push( thisImageOffset );
    });
  },

  // lazy load background images (uses a different way than <img> elements)
  loadBackgroundImages: function () {
    var windowScroll = $( window ).scrollTop();
    for( var i = 0; i < lazyLoad.offsets.length; i++ ) {
      if( lazyLoad.offsets[i] <= windowScroll + ( lazyLoad.windowHeight ) ) {
        var dataStyleValue = $( '.lazy-loader.lazy-bg' ).eq( i ).attr( 'data-style' );
        $( '.lazy-loader.lazy-bg' ).eq( i ).attr( 'style', dataStyleValue );
      }
    }
  }

};

$( document ).on( 'ready', function () {
  // update the image offsets
  lazyLoad.updateImageOffsets();
  // lazy load images
  lazyLoad.loadBackgroundImages();
});

$( window ).on( 'scroll', function () {
  // lazy load images
  lazyLoad.loadBackgroundImages();
});

$( window ).on( 'resize', function () {
  // update the image offsets
  lazyLoad.updateImageOffsets();
  // lazy load images
  lazyLoad.loadBackgroundImages();
});


if ($(".clsLazyLoad").length > 0) {
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
if ($(window).width() < 768 ) {
if ($(".bg-color-brand-blue .image-text-container").length > 0) {
    var j = $('.bg-color-brand-blue .image-text-container').length;
    for(var i =0; i<j;i++)
    {        
        if(i<3)
        {
            $('.bg-color-brand-blue .image-text-container').eq(i).addClass("lazy-xs-show");
        }
        else {

            $('.bg-color-brand-blue .image-text-container').eq(i).addClass("lazy-xs-hide");
        }
    }
    var divHeight = $('.bg-color-brand-blue').height();
	var position = $('.bg-color-brand-blue').position();
	var divHeight = $('.bg-color-brand-blue').height();
	position = position.top +100 ;
	$(window).scroll(function(){
	  var y = $(window).scrollTop();
		var k = $('.bg-color-brand-blue .image-text-container.lazy-xs-hide').length;

		if (y >= position){

			for(var m =0; m<k;m++)
			{
			   if(m<3)
			   { 
					$('.bg-color-brand-blue .image-text-container.lazy-xs-hide').eq(m).addClass("lazy-xs-show").removeClass("lazy-xs-hide");

				}
			}
			var divHeight1 = $('.bg-color-brand-blue').height();
			position = $('.bg-color-brand-blue').position() ;
			 position = position.top + divHeight ;

	  }

});}
}}}