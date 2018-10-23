$(document).on("ready",function(){
    $('.video-text-container .video-modal').on("click keypress",function(e){
		$('.modal-Title').html(vidTxtDialogConfig.vidTxtTitle);
        $('.modal-Copy').html(vidTxtDialogConfig.vidTxtCopy);
        $('.modal-Transcript').html(vidTxtDialogConfig.vidTxtTranscript);
    });
});