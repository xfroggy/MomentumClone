$(document).ready(function() {

  // Checking if city location is already set
  chrome.storage.sync.get('forLocation', function(data) {
    if (data.forLocation) {
      passLocation(data.forLocation);
    } else {
      getData();
    }
  })

  var longitude,
    latitude,
    url;

  // Main function for ajax request
  function getData() {
    var args = arguments;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;

        (args.length) ?
        url = args[0]:
          url = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' +
          longitude + '&units=metric&appid=e28cf24271fef1d65b272a5f41b95415';

        $.ajax({
          url: url,
          success: function(data) {
            var urlIcon;
            if (!data.name || !data.sys.country) {
              $('.weather-block .location').html("Unknown location");
            }
            // Changing default icons
            switch (data.weather[0].icon) {
              case '01d':
                urlIcon = 'sun';
                break;
              case '01n':
                urlIcon = 'moon';
                break;
              case '02d':
                urlIcon = 'cloud-2';
                break;
              case '02n':
                urlIcon = 'cloud';
                break;
              case '03d':
              case '03n':
              case '04n':
              case '04d':
              case '50d':
              case '50n':
                urlIcon = 'cloud-1';
                break;
              case '09n':
              case '09d':
                urlIcon = 'rain';
                break;
              case '10n':
              case '10d':
                urlIcon = 'rain-1';
                break;
              case '11n':
              case '11d':
                urlIcon = 'storm';
                break;
              case '13n':
              case '13d':
                urlIcon = 'snow';
                break;
              default:
                urlIcon = 'sun';
            }

            $('.weatherImg').attr({
              src: '/svg/' + urlIcon + '.svg',
              title: data.weather[0].description
            });
            $('.weather-block .location').html(data.name + ',' + ' ' + data.sys.country);
            $('.weather-block .degrees').html(' ' + Math.round(data.main.temp) + ' ');
            $('body').css({opacity: 1});
            // Setting new location in storage
            chrome.storage.sync.set({
              "forLocation": data.name
            });
          }
        });
      })
    }
  }
  // Switching celcius and fahrenheit
  $('.sign').on('click', function(e) {
    e.preventDefault();
    var temp = $('.weather-block .degrees').html();
    var newTemp;
    if ($(this).html() === "C") {
      newTemp = Math.round(temp * 9 / 5 + 32);
      $('.weather-block .degrees').html(' ' + newTemp + ' ');
      $(this).html("F");
      return false;
    }
    if ($(this).html() === "F") {
      newTemp = Math.round((temp - 32) * 5 / 9);
      $('.weather-block .degrees').html(' ' + newTemp + ' ');
      $(this).html("C");
      return false;
    }
  })

  // we will store the current location in the data variable in order to compare it with a new location
  var data;

  $('.location').on('focus', function() {
    // Adding animation class on focus and delete it on blur
    $(this).attr('contenteditable', true).addClass('animation');
    data = $(this).text();
  }).on('blur', function(e) {
    // Comparing stored location in data with new location
    var newLocation = $(this).text();
    $(this).removeClass('animation');
    if (data !== newLocation) {
      passLocation(newLocation);
      $('.sign').html("C");
    }
  }).on('keydown', function(e) {
    if (e.which === 13) {
      e.preventDefault();
      // Invoke the blur event on press enter button
      $(this).blur();
    }
  });

  function passLocation(newLocation) {
    var cityUrl = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=' + newLocation +
      '&units=metric&appid=e28cf24271fef1d65b272a5f41b95415';
    getData(cityUrl);
  }

})
