(function() {
  $(document).ready(function() {

    chrome.storage.sync.get("goal", function(data) {
      if (data.goal) {
        setGoal(data.goal);
        chrome.storage.sync.get("goalChecked", function(data) {
          if (data.goalChecked) {
            $('#check').prop('checked', true);
            checkChange(true)
          } else {
            checkChange(false)
          }
        })
      } else {
        setGoal();
      }
    });

    $('.focus-field').on('keydown', function(e) {
      if (e.which === 13) {
        e.preventDefault();
        var goal = this.value;
        if (goal) {
          setGoal(goal);
        } else return;
      }
    });

    function setGoal(goal) {
      if (typeof goal === "string" || !goal) {
        if (!goal) {
          $('.setfocus').fadeIn(700);
          $('.focus-field').val('');
          $('.yourfocus').hide();
          return;
        }
        chrome.storage.sync.set({
          'goal': goal
        }, function() {
          $('.setfocus').hide();
          $('.yourfocus').fadeIn(700);
          $('.yourfocus .goaltext').html(goal);
        });
      } else {
        $('.yourfocus').fadeIn(700);
        $('.yourfocus .goaltext').html(goal.goal);
      }
    }

    $('.yourfocus').hover(function() {
      $('.switchOnHover').css({
        opacity: 1
      });
    }, function() {
      $('.switchOnHover').css({
        opacity: 0
      })
    })

    $('.yourfocus').on('click', '.yourfocus_panel .plus', function() {
      chrome.storage.sync.remove('goal', function() {
        $('#check').prop('checked', false);
        setGoal();
        checkChange(false);
      });
    })

    $('.yourfocus .close').on('click', function() {
      checkChange(true);
      $('#check').prop('checked', true);
    });

    $('#check').on('change', function() {
      if ($(this).prop('checked')) {
        checkChange(true);
        $('.focus-status').html('Nice job').fadeIn(200).fadeOut(200).fadeIn(200).
        fadeOut(100);
      } else {
        checkChange(false);
      }
    });

    function checkChange(condition) {
      if (condition) {
        chrome.storage.sync.set({
          'goalChecked': true
        }, function() {
          $('.yourfocus_panel .goaltext').css({
            textDecoration: "line-through"
          });
          $('.close i').html("+");
          $('.yourfocus .close').removeClass('close').addClass('plus');
        });
      } else {
        chrome.storage.sync.set({
          'goalChecked': false
        }, function() {
          $('.yourfocus_panel .goaltext').css({
            textDecoration: "none"
          });
          $('.yourfocus .plus i').html("&#10006;");
          $('.yourfocus .plus').removeClass('plus').addClass('close');
        });
      }
    }
    // feature search code

    // adds underline on focus
    $("#searchBox").focus(function()
      {
        $(".search").css({"border-bottom": "2px solid white", "transition-timing-function": "ease-out", "transition": "0.25s"});
        $(".search-glass").css({'opacity': 1});
      }).blur(function()
      {
        // Border for the usual condition
        $(".search").css({"border-bottom": "2px solid transparent"});
        $(".search-glass").css({'opacity': 0.8});
      });

    // takes text on return keypress and opens new google search page
    $(document).keypress(function(e) {
       if(e.which == 13) {
       var searchString = document.getElementById("searchBox").value;
          searchString = encodeURIComponent(searchString);
          var searchURL =  "http://www.google.com/search?q="+searchString;
         window.open(searchURL, "_self");

         // Eliminating value of the searchBox

         $("#searchBox").val('');
       }//if
    });//keypress
  })
})();
