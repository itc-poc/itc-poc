$(document).ready(function(){var b;var a=(globalmobiledialNum)?globalmobiledialNum:"8449378679";if(matchMedia("(min-width: 600px)").matches){b=(globalPhoneNum)?globalPhoneNum:"866.766.0766"}if(matchMedia("(max-width: 599px)").matches){b=(globalPhoneNum)?globalPhoneNum:"844.YES.ITC"}$(".phoneNumberButton").closest("a").attr("href","tel:+1"+a);$(".phoneNumberButton").closest("a").text(b);if(matchMedia("(min-width: 600px)").matches){$(".phoneNumberButton").css("pointer-events","none")}});