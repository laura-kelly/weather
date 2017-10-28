// KIEI-924 HW#2: jQuery Weather!

let handleWeatherResponse = function(response) {
  // leave these two lines alone; they allow for the inspection of
  // the response object in the browser console
  console.log(response)
  window.response = response

  // **** Beginning of new code.

    //Current Conditions:
  $("#current-conditions-text").html(Math.round(response.currently.temperature) + " and " + response.currently.summary);
  $("#current-conditions-icon").html(icon(response.currently));

    //6-day Forecast:
  $(".forecast").empty();
  let markup = "";
  for(let i = 1; i<7; i++) {
    markup +="<div class='col'>";
    markup +="<h3>"+icon(response.daily.data[i])+"</h3>";
    markup +="<h4>"+Math.round(response.daily.data[i].temperatureHigh)+"|"+Math.round(response.daily.data[1].temperatureLow)+"</h4>";
    markup +="<h5>"+response.daily.data[i].summary+"</h5>";
    markup +="</div>";
  }
  $(".forecast").append(markup);

    //Add fade effects for current and forecast weather data:
  $(".current").fadeIn(2000);
  $(".forecast").fadeIn(2000);
  // *** End of new code
};

// leave this alone; does the event handling and ajax
$(function() {
  $("#get-the-weather").on("click", function(event) {
    event.preventDefault();
    let locationName = $("#location-name").val();
    geocodeAndGetWeather(locationName);
  });
});
