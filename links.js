(function() {
  $(document).ready(function() {

    // Form the list with liks from storage
    chrome.storage.sync.get('links', function(data) {
      if (data.links) {
        data.links.forEach(function(item) {
          $('.newLink').before(item);
        })
      }
    })

    // Open links menu
    $('#linkPopup').on('click', function(e) {
      e.preventDefault();
      $('.links-block .links-popup').fadeToggle(300);
      // Attach events to draggable links
      if ($('.links-popup li[draggable=true]').length) {
        $('.links-popup li[draggable=true]').each(function() {
          addEventsToLinks(this);
        })
      }
    })

    $('.links-block .newLink').on('click', function(e) {
      e.preventDefault();
      $(this).hide();
      $('.linksCreator').show();
    })

    $('.linksCreator .close').on('click', function(e) {
      $('.linksCreator').hide();
      $('.links-block .newLink').show();
    })

    // Adding new links
    $('.nameInput, .urlInput').on('keydown', function(e) {

      if (e.which === 13) {
        e.preventDefault();
        //  Animate empty fields
        $('.nameInput, .urlInput').each(function() {
          if (!$(this).val()) {
            $(this).addClass('animation');
            var t = this;
            setTimeout(function() {
              $(t).removeClass('animation')
            }, 500);
            return false;
          }
        });
        //  Adding
        if ($('.nameInput').val() && $('.urlInput').val()) {

          var insert = "<li class=\"addedLink\" draggable=\"true\"><div draggable=\"true\"><a draggable=\"false\" href=\"http://" + $('.urlInput').val() + "\">" + $('.nameInput').val() + "<img class=\"newLinkImg\" src=\"https://icons.duckduckgo.com/ip2/ergerger.ico\"></a><span class=\"linkClose\">✕</span></div></li>";

          chrome.storage.sync.get('links', function(data) {
            var links = data.links || [];
            links.push(insert);
            chrome.storage.sync.set({
              "links": links
            }, function() {
              $('.newLink').before(insert);
              // Adding event listener to the new link
              var link = $('.newLink').parent().find('.addedLink').last();
              addEventsToLinks(link[0]);
              $('.nameInput, .urlInput').each(function() {
                $(this).val('')
              });
            })
          })
        }
      }

    });

    // Deleting links
    $('.links-popup').on('click', function(e) {
      var target = e.target;
      if ($(target).hasClass('linkClose')) {
        var delItem = target.closest('.addedLink').outerHTML;
        $(target).parent().remove();
        chrome.storage.sync.get('links', function(data) {
          var links = data.links;
          links.forEach(function(item, i) {
            if (item === delItem) {
              links.splice(i, 1)
            }
            return false;
          })
          chrome.storage.sync.set({
            "links": links
          });
        });
        return;
      }
    })

    // Making defaul chrome page and apps page open correctly(2 first links)
    $('.default').on('click', function(e) {
      e.preventDefault();
      var defaulBlankUrl = 'chrome-search://local-ntp/local-ntp.html';
      var defaulAppsUrl = 'chrome://apps';
      if ($(this).hasClass('defaulBlank')) {
        setDefaultPages(defaulBlankUrl)
        return false;
      }
      if ($(this).hasClass('defaulApps')) {
        setDefaultPages(defaulAppsUrl)
        return false;
      }

      function setDefaultPages(url) {
        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, function(tabs) {
          var active = tabs[0].id;
          chrome.tabs.update(active, {
              url: url
            },
            function() {});
        })
      }
    })

    // Closing links menu when clicking somewhere else
    $(document).on('click', function(e) {
      var elem = $('.links-popup');
      if (elem.has(e.target).length === 0 && e.target !== elem[0] &&
        e.target.id !== 'linkPopup') {
        $('.links-popup').fadeOut(300);
      }
    })

    // Drag and drop new links

    var dragTransObj = null;
    var div;

    function handleDragStart(e) {
      dragTransObj = this;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';

      var rect = this.getBoundingClientRect();
      var next = (e.clientY - rect.top) / (rect.bottom - rect.top) > .5;
      if (this !== dragTransObj) {
       (next) ? $(this).insertBefore(dragTransObj):
       $(this).insertAfter(dragTransObj);
      }
    }

    function handleDrop(e) {
      $('.empty').each(function() {
        this.remove();
      })
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      if (dragTransObj != this) {
        dragTransObj.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
      }
      var arr = [];
      chrome.storage.sync.get('links', function(data) {
        var links = data.links || [];
        $('.addedLink').each(function(e) {
          arr[e] = this.outerHTML
        });
        links = arr;
        chrome.storage.sync.set({
          "links": links
        })
      });
      return false;
    }

    function addEventsToLinks(links) {
      links.addEventListener('dragstart', handleDragStart, false);
      links.addEventListener('dragover', handleDragOver, false);
      links.addEventListener('drop', handleDrop, false);
    }

  });

})();
