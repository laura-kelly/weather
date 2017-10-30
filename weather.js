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
    //Define day of the week variable and create array to convert integer returned by dayNum function to a string.
  let d = new Date();
  let dayNum = d.getDay();
  let days = ["Sun", "Mon","Tue","Wed","Thu","Fri","Sat","Sun", "Mon","Tue","Wed","Thu","Fri","Sat"];

  $(".forecast").empty();
  let markup = "";
  for(let i = 1; i<7; i++) {
    markup +="<div class='col'>";
    dayNum++; //get the day of the week for each forecast day.
    markup +="<h3>"+days[dayNum]+"</h3>";
    markup +="<h3>"+icon(response.daily.data[i])+"</h3>";
    markup +="<h4>"+Math.round(response.daily.data[i].temperatureHigh)+"|"+Math.round(response.daily.data[1].temperatureLow)+"</h4>";
    markup +="<h5>"+response.daily.data[i].summary+"</h5>";
    markup +="</div>";
  }
  $(".forecast").append(markup);

    //Add fade effects for current and forecast weather data:
  $(".current").fadeIn(5000);
  $(".forecast").fadeIn(5000);
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
