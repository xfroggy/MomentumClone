$(document).ready(function() {

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

})



































// $(document).ready(function() {
//
// chrome.storage.sync.get("goal", function(data) {
//       if (data.goal) {
//     setGoal(data.goal);
//     chrome.storage.sync.get("goalChecked", function(data){
//       if (data.goalChecked) {
//         $('#check').prop('checked',true);
//         checkChange(true)
//       }
//       else {checkChange(false) }
//     })
//       }
//       else {
//         setGoal();
//       }
//     });
//
// $('.focus-field').on('keydown', function(e) {
//     if (e.which === 13) {
//       e.preventDefault();
//       var goal = this.value;
//       if (goal){
//       setGoal(goal);
//     }
//     else return;
//     }
//   });
//
// function setGoal(goal) {
//  if(typeof goal === "string" || !goal) {
//    if(!goal) {
//    $('.setfocus').fadeIn(700);
//    $('.focus-field').val('');
//    $('.yourfocus').hide();
//    return;
//  }
//    chrome.storage.sync.set({'goal': goal}, function() {
//           $('.setfocus').hide();
//           $('.yourfocus').fadeIn(700);
//           $('.yourfocus .goaltext').html(goal);
//           });
//  }
// else  {
//   $('.yourfocus').fadeIn(700);
//   $('.yourfocus .goaltext').html(goal.goal);
// }
// }
//
// $('.yourfocus').hover(function(){$('.switchOnHover').css({opacity: 1});
// }, function(){$('.switchOnHover').css({opacity: 0})})
//
// $('.yourfocus .plus').on('click', function(){
//   chrome.storage.sync.remove('goal', function(){
//     $('#check').prop('checked',false);
//     setGoal();
//     checkChange(false);
//   });
// })
//
// $('.yourfocus .close').on('click', function(){
//     checkChange(true);
//   });
//
//
//   $('#check').on('change',function(){
//     if($(this).prop('checked')) {
//       chrome.storage.sync.set({'goalChecked': true}, function() {
//       checkChange(true)});
//     }
//     else {
//       chrome.storage.sync.set({'goalChecked': false}, function() {
//      checkChange(false);
//              });
//     }
//   })
//
//   function checkChange(condition) {
//     if (condition) {
//       $('.yourfocus_panel .goaltext').css({textDecoration: "line-through"});
//       $('.close i').html("+");
//       $('.close').removeClass('close').addClass('plus');
//     }
//     else {
//       $('.yourfocus_panel .goaltext').css({textDecoration: "none"});
//       $('.close i').html("&#10006;");
//       $('.close').removeClass('plus').addClass('close');
//     }
//   }
//
// })
//
//
