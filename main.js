(function(){
var arr = [1,2,3,4,5,6];
var rand = Math.round( 0 - 0.5 + Math.random() * (arr.length - 1 - 0 + 1));
var url = "url(img/" + arr[rand] + ".jpg) no-repeat center center fixed";
$('body').css({background:url});



})();
