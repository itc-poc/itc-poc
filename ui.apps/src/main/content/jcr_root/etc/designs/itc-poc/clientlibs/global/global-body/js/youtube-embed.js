// jquery parser plugin: https://github.com/mattsnider/jquery-plugin-query-parser
// using min.js version here: https://raw.githubusercontent.com/mattsnider/jquery-plugin-query-parser/master/jquery-queryParser.min.js
(function($){var pl=/\+/g,searchStrict=/([^&=]+)=+([^&]*)/g,searchTolerant=/([^&=]+)=?([^&]*)/g,decode=function(s){return decodeURIComponent(s.replace(pl," "));};$.parseQuery=function(query,options){var match,o={},opts=options||{},search=opts.tolerant?searchTolerant:searchStrict;if('?'===query.substring(0,1)){query=query.substring(1);}while(match=search.exec(query)){o[decode(match[1])]=decode(match[2]);}return o;};$.getQuery=function(options){return $.parseQuery(window.location.search,options);};$.fn.parseQuery=function(options){return $.parseQuery($(this).serialize(),options);};}(jQuery));

var modal = {
  clickedElement: ''
};

// opening youtube links in bootstrap modal
// from here: http://www.joshuawinn.com/opening-youtube-links-dynamically-in-a-twitter-bootstrap-modal-window/
$(document).ready(function(){
    
  // BOOTSTRAP 3.0 - Open YouTube Video Dynamicaly in Modal Window
  // Modal Window for dynamically opening videos
  $('.modal-video').on('click', function(e){

    // set the clicked tile
    modal.clickedElement = $( this );

    // Store the query string variables and values
    // Uses "jQuery Query Parser" plugin, to allow for various URL formats (could have extra parameters)
    var queryString = $(this).attr('href').slice( $(this).attr('href').indexOf('?') + 1);
    var queryVars = $.parseQuery( queryString );

    // if GET variable "v" exists. This is the Youtube Video ID
    if ( 'v' in queryVars )
    {
      // Prevent opening of external page
      e.preventDefault();

      // Variables for iFrame code. Width and height from data attributes, else use default.
      var iFrameCode = '<iframe scrolling="no" allowtransparency="true" allowfullscreen="true" src="//www.youtube.com/embed/'+  queryVars['v'] +'?rel=0&wmode=transparent&showinfo=0&autoplay=1&modestbranding=1&controls=2&cc_load_policy=1" frameborder="0"></iframe>';

      // Replace Modal HTML with iFrame Embed
      $('#mediaModal .modal-body').append(iFrameCode);
      // Set new width of modal window, based on dynamic video content
      $('#mediaModal').on('show.bs.modal', function () {
        // Add video width to left and right padding, to get new width of modal window
        var modalBody = $(this).find('.modal-body');
        var modalDialog = $(this).find('.modal-dialog');
        var newModalWidth = parseInt(modalBody.css("padding-left")) + parseInt(modalBody.css("padding-right"));
        newModalWidth += parseInt(modalDialog.css("padding-left")) + parseInt(modalDialog.css("padding-right"));
        newModalWidth += 'px';
      });

      // Open Modal
      $( '#mediaModal' ).modal().attr('aria-hidden','false');
    }
  });

});

// close the modal when clicking the close button
$( '.modal-dialog' ).on( 'click', '.modal-close', function () {
  $( '#mediaModal' )
    .modal( 'hide' )
    .attr( 'tabindex', '-1' ).attr('aria-hidden','true');
});

// close the modal if the esc key is pressed
$( document ).on( 'keyup', 'body.modal-open', function ( e ) {
   if ( e.keyCode == 27 ) { // escape key maps to keycode `27`
      $( '#mediaModal' )
        .modal( 'hide' )
        .attr( 'tabindex', '-1' ).attr('aria-hidden','true');
    }
});

// focus on close button when modals are shown
$( '#mediaModal' ).on( 'shown.bs.modal', function () {
  // add focus to close button
  $( '.modal-close' ).focus();
});

// Clear modal contents on close. 
// There was mention of videos that kept playing in the background.
$( '#mediaModal' ).on( 'hidden.bs.modal', function () {
  $('#mediaModal .modal-body')
    .html('<button class="modal-close"><i class="fa fa-close aria-hidden="true"></i>close</button>')
    .closest( '#mediaModal' )
    .attr( 'tabindex', '-1' ).attr('aria-hidden','true');

  // give focus to previously clicked element
     if(modal.clickedElement !=""){

 modal.clickedElement.focus();
    }
});