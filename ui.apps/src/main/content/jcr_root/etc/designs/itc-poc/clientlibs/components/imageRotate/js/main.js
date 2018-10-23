
$(document).ready(function(){
	var noofImages = parseInt($("#myCar").attr('data-noofimages'));
	var imageURL = $("#myCar").attr('data-imageurl');
    imageURL=imageURL+"/";
	var imageType = $("#myCar").attr('data-imagetype');
	$("#myCar").vc3dEye({
		imagePath:imageURL,
		totalImages:noofImages,
		imageExtension:imageType
	});

});

