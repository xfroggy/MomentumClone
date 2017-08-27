$(document).ready(function() {

//  for whatever reason, preview mode on Cloud9 won't work if the chrome app details are included so I generally have to put this first section into comment to test
chrome.storage.sync.get("goal", function(data) {
      if (data.goal) {
    setGoal(data.goal);
    chrome.storage.sync.get("goalChecked", function(data){
      if (data.goalChecked) {
        $('#check').prop('checked',true);
        checkChange(true)
      }
      else {checkChange(false) }
    })
      }
      else {
        setGoal();
      }
    });  

  
$('.focus-field').on('keydown', function(e) {
    if (e.which === 13) {
      e.preventDefault();
      var goal = this.value;
      if (goal){
      setGoal(goal);
    }
    else return;
    }
  });

function setGoal(goal) {
 if(typeof goal === "string" || !goal) {
   if(!goal) {
   $('.setfocus').fadeIn(700);
   $('.focus-field').val('');
   $('.yourfocus').hide();
   return;
 }
   chrome.storage.sync.set({'goal': goal}, function() {
          $('.setfocus').hide();
          $('.yourfocus').fadeIn(700);
          $('.yourfocus .goaltext').html(goal);
          });
 }
else  {
  $('.yourfocus').fadeIn(700);
  $('.yourfocus .goaltext').html(goal.goal);
}
}

$('.yourfocus').hover(function(){$('.switchOnHover').css({opacity: 1});
}, function(){$('.switchOnHover').css({opacity: 0})})

$('.yourfocus').on('click', '.plus', function(){
  chrome.storage.sync.remove('goal', function(){
    $('#check').prop('checked',false);
    setGoal();
    checkChange(false);
  });
})

$('.yourfocus .close').on('click', function(){
    checkChange(true);
    $('#check').prop('checked',true);
  });


  $('#check').on('change',function(){
    if($(this).prop('checked')) {
      checkChange(true);
    }
    else {
     checkChange(false);
    }
  });

  function checkChange(condition) {
    if (condition) {
      chrome.storage.sync.set({'goalChecked': true}, function() {
        $('.yourfocus_panel .goaltext').css({textDecoration: "line-through"});
        $('.close i').html("+");
        $('.close').removeClass('close').addClass('plus');
    });
    }
    else {
      chrome.storage.sync.set({'goalChecked': false}, function() {
        $('.yourfocus_panel .goaltext').css({textDecoration: "none"});
        $('.plus i').html("&#10006;");
        $('.plus').removeClass('plus').addClass('close');
             });
    }
  }  
  
  
// feature search code

// adds underline on focus
$("#searchBox").focus(function()
  { 
    $(".search").css({"border-bottom": "2px solid white", "transition-timing-function": "ease-out", "transition": "0.25s"});
  }).blur(function()
  {
    $(".search").css({"border-bottom": "none"});
  });

// takes text on return keypress and opens new google search page
$(document).keypress(function(e) {
   if(e.which == 13) {
   var searchString = document.getElementById("searchBox").value;
      searchString = encodeURIComponent(searchString);
      var searchURL =  "http://www.google.com/search?q="+searchString;
     window.open(searchURL, "_self");
   }//if
});//keypress
});// jquery document closing  