var FunReads = {

	// handle bar template file name
    funreadsTemplate: "/components/fun-reads/fun-reads.handlebars",
    selText: "",
	cardTextHeight : '',

	// will call model and bindEvents on page load
    init: function () {
		FunReads.onReadyEvents();
        FunReads.bindEvents();

    },

    onReadyEvents: function () {       
        //load articles on load
        FunReads.getArticleCards(""); 
    },

    bindEvents: function () {
       $('.funReadDropdown').change(function(){
            FunReads.selText = $(".funReadDropdown option:selected").text();
            if("Most Recent" == FunReads.selText){
                FunReads.selText = "";
            }
            FunReads.getArticleCards(FunReads.selText);
            
        });

    },

    getArticleCards: function(selText) {
       // console.log(selText);
	var detailsObj ={},publishDate,fileReference,pagePath,byOption,postedBy;
	var searchUrl=articleFilter.searchPath;
	var backgroundClr=articleFilter.backgroundColor;
    var linkTextclr=articleFilter.linkTextcolor;
    var noOfArticles=articleFilter.noOfArticles === ""?6:articleFilter.noOfArticles;
        
	if (searchUrl.startsWith("/content/itc-poc/blog"))
	{
		searchUrl=searchUrl;
	}else{
		searchUrl="/content/itc-poc/blog"+searchUrl;
	}
	
	var author = "no";
		
	if( $(location).attr('host').search("author") > -1 ){
		
		author = "yes";
		
	}
		
		  $.ajax({
    		method : "POST",
    		url : "/bin/articles/filter",
    		data : {
    			keyword: selText,
    			noOfArticles:noOfArticles,
    			searchPath:searchUrl,
                filterProperty:articleFilter.filterProperty
                

    		},
            success: function(resp) { 
                //alert(resp);
                $('#fun-reads').empty();
               detailsObj= $.map(resp, function(value, index) {
 

                   	if(typeof value.funReadHeroImage ==='undefined'){
                       	value.funReadHeroImage =  value.imageReference;
                    }
                   	funReadHeroImage = value.funReadHeroImage;
                    pagePath = value.pagePath;

				/*	if(author=="no"){
						if (pagePath.startsWith("/content/itc-poc/blog"))
						{
							pagePath = pagePath.replace("/content/itc-poc/blog","");
							value.pagePath = pagePath.replace("/content/itc-poc/blog","");

						}
					}*/

                 //  document.getElementById('fun-reads').innerHTML += '<div > Page:'+value.pagePath+'-------Image-Path:' + funReadHeroImage + '</div>';

					byOption =value.byOption;
					postedBy = value.postedBy;
                    if(value.publishDate!='undefined'){
                        var mydate = new Date(value.publishDate);
                        if (isNaN(mydate)==false){
                        var monthNames = ["January", "February", "March", "April", "May", "June",
  										"July", "August", "September", "October", "November", "December"];
						value.publishDate=(monthNames[(mydate.getMonth())]+" "+mydate.getDate()+', '+mydate.getFullYear() )
                        }
                    }
					return[value];
				});

				detailsVal  = {detailsVal:detailsObj.slice(0, detailsObj.length)}
                ItcpocSearch.templates.execute( FunReads.funreadsTemplate, detailsVal).done(function (html) {
                   // console.log(html);

                    if($(".article-filter .article-item").length != 0){
                        $('#fun-reads').empty();
                    }
                    $('#fun-reads').append( html ); 
                    $(".article-item .card-block").css("background-color",backgroundClr);
                    $(".article-item .card-block a").css("color",linkTextclr);
                    if($(window).width() > 766) {   
                        FunReads.alignText();
                        console.log("Final height of cards:"+FunReads.cardTextHeight);
                        $(".article-item .card-block").css("height",FunReads.cardTextHeight); 
                    }   

            	});



            
            }
    	});
    },
   

	alignText : function(){
		
		FunReads.cardTextHeight=0;
        var count=0;

		$(".article-item .card-block").each(function () {

            var height = 0;
            height=$(this).outerHeight();

			if(height>FunReads.cardTextHeight){
				FunReads.cardTextHeight=height;
            }
            count=count+1;
        });
	}

};


$(function() {
	FunReads.init();
});

$(window).resize(function(){
	FunReads.getArticleCards(FunReads.selText);
});