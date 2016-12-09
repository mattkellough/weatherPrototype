$(document).ready(function(){
  $.ajax({
    url: 'https://api.wunderground.com/api/60f876ff0891b4ca/conditions/forecast10day/q/zmw:00000.1.78388.json',
    cache: true,
    // timeout: 3000,
    jsonp: 'callback',
    dataType: 'jsonp',
    success: function( data ) {
      var WEATHER_UNIT = 'F';
      var currentIcon = weatherIcon(data.current_observation.icon);

      var currentTemp = data.current_observation.temp_f ;

      for (var i = 0; i < 5; i++) {
        var forecast = data.forecast.simpleforecast.forecastday ;
        var date = '<div class="weather-date">' + forecast[i].date.weekday_short + '</div>';
        var image = weatherIcon(forecast[i].icon);
        var high = (WEATHER_UNIT == 'F') ? forecast[i].high.fahrenheit : forecast[i].high.celsius;
        var low = (WEATHER_UNIT == 'F') ? forecast[i].low.fahrenheit : forecast[i].low.celsius;

        var text = '<div class="singleDay">'+image + date + high + '<sup>&deg;</sup> ' + '| ' + low + '<sup>&deg;</sup></div>';
        $(text).appendTo('.weeklyRow');
      }

      var d = new Date();
      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";

      var n = weekday[d.getDay()];

      $(currentIcon).appendTo('.currentWeather');
      $('<h2>'+currentTemp+'<sup>&deg;</sup>F</h2>').insertAfter('.currentWeather img');
      $('<h3>'+n+'</h3>').insertAfter('.currentWeather h2');

    }
  });

  function buildForecast () {
    for (var i = 0; i < forecast.length; i++) {
      var date = '<div class="weather-date">' + forecast[i].date.monthname_short + ' ' + forecast[i].date.day + '</div>';
      var image = weatherIcon(forecast[i].icon);
      var high = (WEATHER_UNIT == 'F') ? forecast[i].high.fahrenheit : forecast[i].high.celsius;
      var low = (WEATHER_UNIT == 'F') ? forecast[i].low.fahrenheit : forecast[i].low.celsius;

      var weather = '<div class="weather-details">' + high + '&deg; <span>|</span> ' + low + '&deg;</div>';

      $('.day-' + ( i + 1)).html(date + image + weather);
    }
  }

  function weatherIcon (icon) {
    return '<img src="icons/' + icon + '.svg">';
  }

  var dat = new Date();
  var hourBG = dat.getHours();

  console.log(hourBG);

  if (6 <= hourBG && hourBG <= 18) {
    $('.weather').addClass('day');
  } else {
    $('.weather').addClass('night');
  }

});
