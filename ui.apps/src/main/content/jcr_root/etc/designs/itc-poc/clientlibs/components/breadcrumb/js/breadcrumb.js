$( document ).ready( function () {
$(".hideBreadcrumb").closest(".breadcrumb").hide();
$(".breadcrumb-container .breadcrumbs li:last-child").find("a").attr('href', '#');
});