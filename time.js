$(document).ready(function() {
resreshTime();

function resreshTime() {
var date = new Date();
var dateHours = (date.getHours() + 24) % 12 || 12;
var dateMinutes = (date.getMinutes() < 10) ? "0" + date.getMinutes()
 : date.getMinutes();
$('.central-block .hours').html(dateHours);
$('.central-block .minutes').html(dateMinutes);
}

setInterval(resreshTime,5000);

(function() {
  var time = new Date().getHours();
  var greeting;
  if(time >= 22) {
    greeting = "Good night, User.";
  }
  if( time >= 16 && time < 22) {
  greeting = "Good evening, User.";
}
if(time < 16 && time >= 12) {
  greeting = "Good afternoon, User.";
}
if(time >= 6 && time < 12) {
  greeting = "Good morning, User.";
}

$('.central-block .greeting').html(greeting);
})();



})
