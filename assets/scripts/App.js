$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLoc);
  }
});

function getLoc(position) {
  var curLoc = {
    "lat": position.coords.latitude,
    "lon": position.coords.longitude
  };
  getData(createApiCall(curLoc));
}

function createApiCall(loc) {
  return "https://fcc-weather-api.glitch.me/api/current?lat=" + loc.lat + "&lon=" + loc.lon;
}

function getData(apiKey) {
  $.getJSON(apiKey, function(json) {
    var temps = [
      Math.round(json.main.temp),
      Math.round(json.main.temp_min),
      Math.round(json.main.temp_max)
    ];
    var els = {
      "loc": $("<h1>").addClass("loc").text("Local Weather In " + json.name),
      "weather": $("<h4>").addClass("weather").text(json.weather[0].main),
      "icon": $("<img>").addClass("icon").attr("src", json.weather[0].icon),
      "curT": $("<button>").addClass("mainT btnT").text("Current: " + temps[0] + "ºC"),
      "minT": $("<button>").addClass("minT btnT").text("Min: " + temps[1] + "ºC"),
      "maxT": $("<button>").addClass("maxT btnT").text("Max: " + temps[2] + "ºC"),
    }
    pageSet(els);
    $(".btnT").on("click", function() {
      changeMeasure(temps);
    });
  });
}

function pageSet(els) {
  var $temp_block = $("<div>").append(els.minT).append(els.curT).append(els.maxT);
  var $weather_block = $("<div>").html(els.weather).append(els.icon);
  $(".container").html(els.loc).append($temp_block).append($weather_block);
}

function changeMeasure(temps) {
  var c = $(".btnT:contains('ºC')");
  if (c.length > 0) {
    for (var i = 0; i < temps.length; i++) {
      temps[i] = Math.round((9 / 5) * temps[i] + 32);
      //console.log(temps[i]);
    }
    $(".mainT").text("Current: " + temps[0] + "ºF");
    $(".minT").text("Min: " + temps[1] + "ºF");
    $(".maxT").text("Max: " + temps[2] + "ºF");
  } else {
    for (var i = 0; i < temps.length; i++) {
      temps[i] = Math.round((temps[i] - 32) * (5 / 9));
      //console.log(temps[i]);
    }
    $(".mainT").text("Current: " + temps[0] + "ºC");
    $(".minT").text("Min: " + temps[1] + "ºC");
    $(".maxT").text("Max: " + temps[2] + "ºC");
  }
}