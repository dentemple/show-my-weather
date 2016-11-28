// API information
var locationURL = "http://ip-api.com/json/?callback=?";
var weatherURL = "http://api.openweathermap.org/data/2.5/weather?";
// General
var cityStateCountry = "";
var latitude = "";
var longitude = "";
var temperature = "";
var altUnits = "";
var weatherType = "";
var weatherDescription = "";
var weatherIcon = "";
var iconWidth = "150px";
var iconHeight = "150px";
var degreeUnits = "imperial";

// Prevents possible caching issues
$.ajaxSetup({ cache: false });

// Register events
$(document).ready(initializePage);
function initializePage() {
  $.getJSON(locationURL, function(json) {
    cityStateCountry = JSON.stringify(json.city) + ", " + JSON.stringify(json.regionName) + " " + JSON.stringify(json.countryCode);
    cityStateCountry = cityStateCountry.replace(/"/g,"");
    latitude = JSON.stringify(json.lat);
    longitude = JSON.stringify(json.lon);
    showBrowserLocation();
    handleWeatherData();
  });
};

// Passes location information to the browser
function showBrowserLocation() {
  $("#location").html(cityStateCountry);
}

// Calls to the weather API
function handleWeatherData() {
  var add = "&id=524901&APPID=daf2b2334d0699669d8e1b254a049ef3";
  var weatherCall = weatherURL + "lat=" + latitude + "&lon=" + longitude + "&units=" + degreeUnits + add;
  console.log(weatherCall);
  $.getJSON(weatherCall, function(json) {
    temperature = JSON.stringify(Math.round(json.main.temp));
    if (degreeUnits == "imperial") {
      temperature += "&deg;F";
      altUnits = "&deg;C";
    } else {
      temperature += "&deg;C";
      altUnits = "&deg;F";
    }
    weatherType = JSON.stringify(json.weather[0].main).replace(/"/g,"");
    weatherDescription = JSON.stringify(json.weather[0].description).replace(/"/g,"");
    weatherIcon = JSON.stringify(json.weather[0].icon).replace(/"/g,"");
    showWeatherData();
  });
}

// Passes the weather information to the browser
function showWeatherData() {
  var imageLink = "http://openweathermap.org/img/w/";
  $("#temperature").html(temperature);
  $("#description").html(weatherDescription);
  $("#icon").empty().append('<img src="' + imageLink + weatherIcon + '.png" height="' + iconHeight + '" width="' + iconWidth + '">');
}