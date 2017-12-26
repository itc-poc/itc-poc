 /*Reading Dialog Values in JS - START*/


var backgroundColor 		= "#"+buttonProps.backgroundColor;
var borderColor 			= "#"+buttonProps.borderColor;
var fontColor 				= "#"+buttonProps.fontColor;
var backgroundColorHover 	= "#"+buttonProps.backgroundColorHover;
var borderColorHover 		= "#"+buttonProps.borderColorHover;
var fontColorHover 			= "#"+buttonProps.fontColorHover;

/*Reading Dialog Values in JS - END*/

$(function(){

    /*Button Configuration Code - START*/
	
	$('.carousel-content .btn').css({"background-color": backgroundColor, "color": fontColor, "border-color": borderColor});

	$('.carousel-content .btn').hover(function(e) {
		$(this).css({"background-color":e.type === "mouseenter"?backgroundColorHover:backgroundColor,
					 "border-color":e.type === "mouseenter"?borderColorHover:borderColor,
					 "color":e.type === "mouseenter"?fontColorHover:fontColor});

	});


    /*Button Configuration Code - END*/

	// Carousel Extension accessability
  	// ===============================

      $('.carousel').each(function (index) {

        var $this = $(this)
          , $prev        = $this.find('[data-slide="prev"]')
          , $next        = $this.find('[data-slide="next"]')
          , $tablist    = $this.find('.carousel-indicators')
          , $tabs       = $this.find('.carousel-indicators li')
       	 , $tablistthumb    = $this.find('#thumbnail_div .carousel-indicators-thumb')
          , $tabsthumb       = $this.find('#thumbnail_div .carousel-indicators-thumb li')
          , $tabpanels  = $this.find('.item')
          , $tabpanel
          , $tablistHighlight
          , $pauseCarousel
          , $complementaryLandmark
          , $tab
          , $is_paused = false
          , offset
          , height
          , width
          , i
          , id_title  = 'id_title'
          , id_desc   = 'id_desc'


        $tablist.attr('role', 'tablist')
        $tablistthumb.attr('role', 'tablist')
        if($('#thumbnail_div .carousel-indicators-thumb li').length > 0){

        $('#thumbnail_div .carousel-indicators-thumb li').each(function () {
            var img = new Image();
    img.src = $(this).css('background-image').replace(/url\(|\)$|"/ig, '');
   



        })}

       $tabs.focus(function() {          
          $this.carousel('pause')
          $is_paused = true
          $(this).parent().addClass('active');
          $(this).parents('.carousel').addClass('contrast')
        })

        $tabs.blur(function(event) {          
          $(this).parent().removeClass('active');
          $(this).parents('.carousel').removeClass('contrast')
        })

  		$tabsthumb.focus(function(e) {
          $this.carousel('pause')
          $is_paused = true
           
           e.preventDefault()
           e.stopPropagation()

 
        })

      $tabsthumb.blur(function(event)  {          
         $(this).parent().removeClass('active');
          $(this).parents('.carousel').removeClass('contrast')
        })




        if (typeof $this.attr('role') !== 'string') {
          $this.attr('role', 'complementary');
          $this.attr('aria-labelledby', id_title);
          $this.attr('aria-describedby', id_desc);
          $this.prepend('<p  id="' + id_desc   + '" class="sr-only">A carousel is a rotating set of images, rotation stops on keyboard focus on carousel tab controls or hovering the mouse pointer over images.  Use the tabs or the previous and next buttons to change the displayed slide.</p>')
          $this.prepend('<h2 id="' + id_title  + '" class="sr-only">Carousel content with ' + $tabpanels.length + ' slides.</h2>')
        }           
        

        // Add space bar behavior to prev and next buttons for SR compatibility
        $prev.attr('aria-label', 'Previous Slide')
        $prev.keydown(function(e) {
          var k = e.which || e.keyCode
          if (/(13|32)/.test(k)) {
            e.preventDefault()
            e.stopPropagation()
            $prev.trigger('click');
          }
        });

        $('.carousel-inner').focus(function(e) {
          
         e.preventDefault()
            e.stopPropagation()
        }) 

        $prev.focus(function() {
          $(this).parents('.carousel').addClass('contrast')
        })        

        $prev.blur(function() {
          $(this).parents('.carousel').removeClass('contrast')
        })        
        
        $next.attr('aria-label', 'Next Slide')
        $next.keydown(function(e) {
          var k = e.which || e.keyCode
          if (/(13|32)/.test(k)) {
              
            $next.trigger('click');
          }
        });

        $next.focus(function() {
          $(this).parents('.carousel').addClass('contrast')
        })        

        $next.blur(function() {
          $(this).parents('.carousel').removeClass('contrast')
        })        
        
        $('.carousel-inner a').focus(function() {
          
          $(this).parents('.carousel').addClass('contrast')
        })        

         $('.carousel-inner a').blur(function() {
             
          $(this).parents('.carousel').removeClass('contrast')
        })      

        $tabs.each(function () {
          var item = $(this)
          if(item.hasClass('active')) {

            item.attr({ 'aria-selected': 'true', 'tabindex' : '-1' });
			$('#thumbnail_div .carousel-indicators-thumb li').attr('tabindex',0);
          }else{
            item.attr({ 'aria-selected': 'false', 'tabindex' : '-1' });
			$('#thumbnail_div .carousel-indicators-thumb li').attr('tabindex',0);
          }
        })
            $tabsthumb.each(function () {
          var item = $(this)
          if(item.hasClass('active')) {
            item.attr({ 'aria-selected': 'true', 'tabindex' : '0' })
          }else{
            item.attr({ 'aria-selected': 'false', 'tabindex' : '-1' });
			$('#thumbnail_div .carousel-indicators-thumb li').attr('tabindex',0);
          }
        })
      })

      var slideCarousel = $.fn.carousel.Constructor.prototype.slide
      $.fn.carousel.Constructor.prototype.slide = function (type, next) {
		   var carsx = this.$element;
 if((carsx).hasClass('newCarousel')){

        var $element = this.$element;
         var $active  = $element.find('[role=tabpanel].active')
        ,$activeimage  = $element.find('[role=tabpanelimage].active')
        , $activeimage  = $element.find('[role=tabpanelimage].active')
          , $next    = next || $active[type]()
		   , $nextimage    = next || $activeimage[type]()
          , $tab
          , $tab_count = $element.find('[role=tabpanel]').length//size()
          , $tab_image_count = $element.find('[role=tabpanelimage]').length//size()
          , $prev_side = $element.find('[data-slide="prev"]')
          , $next_side = $element.find('[data-slide="next"]')
          , $index      = 0
          , $prev_index = $tab_count -1
           , $prev_image_index = $tab_image_count -1
          , $next_index = 1
          , $id

        if ($next && $next.attr('id')) {
          $id = $next.attr('id')
          $index = $id.lastIndexOf("-")
          if ($index >= 0) $index = parseInt($id.substring($index+1), 10)

          $prev_index = $index - 1
          if ($prev_index < 1) $prev_index = $tab_count - 1
          
          $next_index = $index + 1
          if ($next_index >= $tab_count) $next_index = 0
        }  

                
        $prev_side.attr('aria-label', 'Show slide ' + ($prev_index+1) + ' of ' + $tab_count)
        $next_side.attr('aria-label', 'Show slide ' + ($next_index+1) + ' of ' + $tab_count)


          slideCarousel.apply(this, arguments)

      $active
        .one('bsTransitionEnd', function () {
          var $tab

          $tab = $element.find('li[aria-controls="' + $active.attr('id') + '"]')
         
          if ($tab) $tab.attr({'aria-selected':false, 'tabIndex': '-1'})
			  $('#thumbnail_div .carousel-indicators-thumb li').attr('tabindex',0);

          $tab = $element.find('li[aria-controls="' + $next.attr('id') + '"]')
           
          if ($tab) $tab.attr({'aria-selected': true, 'tabIndex': '-1'})
			  $('#thumbnail_div .carousel-indicators-thumb li').attr('tabindex',0);



       })

      	   $activeimage
        .one('bsTransitionEnd', function () {
          var $tab

          $tab = $element.find('li[aria-controls="' + $activeimage.attr('id') + '"]')
          if ($tab) $tab.attr({'aria-selected':false, 'tabIndex': '-1'})
			  $('#thumbnail_div .carousel-indicators-thumb li').attr('tabindex',0);

          $tab = $element.find('li[aria-controls="' + $nextimage.attr('id') + '"]')
          if ($tab) $tab.attr({'aria-selected': true, 'tabIndex': '0'})



       })



     setTimeout(function () {

           $('#car-ind li').each(function () {

            
		   if($( this ).hasClass('active'))
		   {
              
				var a = this.getAttribute("data-id")


          		 $('#thumbnail_div .carousel-indicators-thumb li').each(function () {

							var b  = this.getAttribute("data-id")

                            if(a == b)
                            {
                                 $( this ).addClass('active');

                            }
                     else{

                                   $( this ).removeClass('active');
                             }



                     })

		   }
		   
		   

        })
       }, 300) 
   if($('#thumbnail_div .carousel-indicators-thumb li').length > 0){
	thumbnailNavigationScroll($index,type)  ;
        textLarge();
   }
 }
      }



     var $this;
     $.fn.carousel.Constructor.prototype.keydown = function (e) {
		 var carsx = $(this);
		 if((carsx).hasClass('newCarousel')){
     $this = $this || $(this)
     if(this instanceof Node) $this = $(this)
     
     function selectTab(index) {
       if (index >= $tabs.length) return 
       if (index < 0) return

       $carousel.carousel(index)
       setTimeout(function () {
            $tabs[index].focus()
            // $this.prev().focus()
       }, 150)      
        if (index >= $tablistthumb.length) return 
       if (index < 0) return

       $carousel.carousel(index)
       setTimeout(function () {
            $tablistthumb[index].focus()
            // $this.prev().focus()
       }, 150)
     }
     
     var $carousel = $(e.target).closest('.carousel')
      , $tabs      = $carousel.find('[role=tab]')
      , k = e.which || e.keyCode
      , index
       
      if (!/(37|38|39|40)/.test(k)) return
      
      index = $tabs.index($tabs.filter('.active'))

       indextab = $tablistthumb.index($tablistthumb.filter('.active'))
      if (k == 37 || k == 38) {                           //  Up
        index--
        selectTab(index);
      }

      if (k == 39 || k == 40) {                          // Down
        index++
        selectTab(index);
      }
            if (k == 37 || k == 38) {                           //  Up
        indextab--
        selectTab(indextab);
      }

      if (k == 39 || k == 40) {                          // Down
        indextab++
        selectTab(indextab);
      }

      e.preventDefault()
      e.stopPropagation()
    }
     
	 }
    $(document).on('keydown.carousel.data-api', 'li[role=tab]', $.fn.carousel.Constructor.prototype.keydown)


   $('.newCarParentID .carousel-control').click(function(e){


            e.preventDefault();

            $("#"+carouselConfig.carouselId).carousel( $(this).data('slide') );
        if($('#thumbnail_div .carousel-indicators-thumb li').length > 0){
             textLarge();
         setTimeout(function () {

           $('#car-ind li').each(function () {
		   if($( this ).hasClass('active'))
		   {
				var a = this.getAttribute("data-id")



          		 $('#thumbnail_div .carousel-indicators-thumb li').each(function () {
							var b  = this.getAttribute("data-id")

                            if(a == b)
                            {

                                $( this ).addClass('active');
                            }
                     else{

                                   $( this ).removeClass('active');
                            }

                     })


		   }


        })
         }, 500) }
		 
		 
	  // thumbnailNavigationScroll();


        });
  $("#newCarousel ol.carousel-indicators  li").on("click",function(){ 
        $('#newCarousel ol.carousel-indicators li.active').removeClass("active");
        $(this).addClass("active");
    });

    $( "#newCarousel a.modal-video").on('click', function(e) {
                   //e.preventDefault();
            $("#"+carouselConfig.carouselId).carousel("pause");
            var mtitle = $(this).data("vtitle") || "";
            var mcopy = $(this).data("vcopy") || "";
            var mTranscript = $(this).data("vtransript") || "";
            $( '.modal-title' ).html( mtitle );
            $( '.modal-copy' ).html( mcopy );
            $( '.modal-transcript' ).html( mTranscript );

            $("#mediaModal").modal();
        });
     $( "#newCarousel a.modal-video").on('keypress', function(e) { 

         var keyCode = e.which;
         if(keyCode ==13){
             $(this).trigger("click");  
         }
     });

    function swipeCarousel() { 


        $('.carousel').addClass('swipeImage');

        $("#newCarousel").swipe({
            
            swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

                if (direction == 'left') $(this).carousel('next');
                if (direction == 'right') $(this).carousel('prev');

            
            },
        allowPageScroll: "auto"

        }); 

   }
 //swipeCarousel();later need to fix this issue for mobile swipe



    });//END document.ready






thumbnailNavigation = function(){
     defaultThumbnail = 5;


},


    thumbnailNavigationScroll = function(index,navtype){
 		var total ;
        var first;


        total = index + defaultThumbnail;
        if(index == "1" && total < defaultThumbnail)
        {
       		 total = total-1;
        }

        var totallength =$('ol#carousel-indicators-thumb li').length;
             if(navtype =="prev" && index == 0 && preVal ==0 )
             {
                index =  totallength -defaultThumbnail;
                 first = true;
             }
        if(total <= totallength )
        {

           /* var a = index * 252.8*/
           
            if(index == 0)
            {
                $('#thumbnail_div .carousel-indicators-thumb li:lt('+totallength+')').show();
          	 //	$('.carousel-indicators-thumb li:gt('+4+')').hide();
            }
            else
            {
                 if((navtype =="prev"))
                    {

                      //  index = index-1
                        if(index !="4")
                        { $('#thumbnail_div .carousel-indicators-thumb li:eq('+index+')').show();}
                        else
                        {
                            index= totallength -index -1;
                            $('#thumbnail_div .carousel-indicators-thumb li:gt('+index+')').show();
                             $('#thumbnail_div .carousel-indicators-thumb li:lt('+index+')').hide();
                        }
                    }
                    else
                    {
               	 	$('#thumbnail_div .carousel-indicators-thumb li:lt('+index+')').hide();;
           		 }
            }

        }


preVal = index;

},

 textLarge = function(){

 $('#thumbnail_div ol li ').each(function () {
    var a = $(this).find('.text-carousel').innerHeight();

	var b = $(this).find('.middle').innerHeight(); 

	var c = $(this).find('.bottom').innerHeight(); 

    var d 
      if((a > 20) && (a <=41))
    	 {
             if(b !='null') 
             {
            
            	 d= 30
             }
         }

      if((a > 42) && (a <=61))
    	 {
              if((b !='null') || (c !='null'))
             {
            	 d= 15
             }

         }

     if(a > 62) 
    	 {
            	 d= 0;

         }


     $(this).find('.text-carousel').css('top', d+'px');

         });
},

$(window).on('resize', function() {
   if($('#thumbnail_div .carousel-indicators-thumb li').length > 0){
    defaultThumbnail = 5;
     preVal =0;  
       textLarge();
   }


});

 $(document).ready(function() {  
	$('.carousel-content .btn').bind('touchstart', function(e) {
		$(this).css({"background-color":backgroundColorHover,
					 "border-color":borderColorHover,
					 "color":fontColorHover});

	});
   if($('#thumbnail_div .carousel-indicators-thumb li').length > 0){
 textLarge();
   }
   $('#thumbnail_div .carousel-indicators-thumb li').attr('tabindex',0);
   $('#thumbnail_div .carousel-indicators-thumb li').keyup(function(event){
	    /* var keycode = (event.keyCode ? event.keyCode : event.which); */
		if(event.keyCode === '39'){
			$(this).next().trigger('click');
			$(this).next().focus();
		}
		if(event.keyCode === '37'){
			$(this).prev().trigger('click');
			$(this).prev().focus();
		}
   });
});
