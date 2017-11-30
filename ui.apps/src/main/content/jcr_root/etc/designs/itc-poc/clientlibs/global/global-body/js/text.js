$(function() {
    
    $(".text").on('click', '.read-more-link', function() {
        var $this = $(this);
        var $readMoreEle = $this.parent().clone();
        var $innerContentEle = $this.parent().siblings('.inner-content');
        
        $(this).parent().parent().find('p:first-child').addClass('display-inline');
        
        if ($this.find('.read-more-text').text().trim() === "Read More") {
            $innerContentEle.addClass('display-inline');
            $readMoreEle.find(".read-more-text").text("Collapse");
        } else {
            $innerContentEle.removeClass('display-inline');
            $readMoreEle.find(".read-more-text").text("Read More");
        }
        
        $readMoreEle.find("i").toggleClass("fa-caret-up fa-caret-down");
        $(this).parent().parent().append($readMoreEle);
        $(this).parent().remove();
    });
    
});
