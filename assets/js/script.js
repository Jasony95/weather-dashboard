var apiBtn = $('#cityBtn');
const APIKey = "3d7566facda6094f6f38d4d79a1026a7";
var city = $('#city-text').val();
var currentTime = dayjs();
var currentWeatherCard = '';
var currentIconURL = '';
var lon = 0;
var lat = 0;
var nextDayCard = '';
var fiveDay = '';

var fetchCurrentURL = "";

var fetchFutureURL = "";

function getCurrentApi() {
  // if (currentWeatherCard != undefined) {
  //   currentWeatherCard.remove();
  // }
  city = $('#city-text').val();
  // var city = "Saint Paul";
  fetchCurrentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  fetch(fetchCurrentURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.main.temp);

      var currentDate = currentTime.format("MM/DD/YYYY");
      var currentTemp = kelvinToF(data.main.temp);
      var currentWind = data.wind.speed;
      var currentHumidity = data.main.humidity;
      var currentIcon = data.weather[0].icon;
      console.log(currentIcon);
      var currentIconURL = "http://openweathermap.org/img/w/" + currentIcon + ".png";
      lat = data.coord.lat.toFixed(2);
      lon = data.coord.lon.toFixed(2);

      if (currentWeatherCard === "") {
        console.log("currentWeatherCard is empty string.")
        currentWeatherCard = $(`<div class="col" id="dataCard">
        <div id="topCard">
          <h2>${city} ${currentDate}<img id="icon" src=${currentIconURL} alt="Weather Icon"></h2>
          <p>Temp: ${currentTemp}&#8457;</p>
          <p>Wind: ${currentWind} MPH</p>
          <p>Humidity: ${currentHumidity}%</p>
        </div>
        `);

      $('#category').append(currentWeatherCard);
      }

      else {
        currentWeatherCard.remove();
        console.log("remove currentWeatherCard")
        currentWeatherCard = $(`<div class="col" id="dataCard">
        <div id="topCard">
          <h2>${city} ${currentDate}<img id="icon" src=${currentIconURL} alt="Weather Icon"></h2>
          <p>Temp: ${currentTemp}&#8457;</p>
          <p>Wind: ${currentWind} MPH</p>
          <p>Humidity: ${currentHumidity}%</p>
        </div>
        <div class="container text-center">
          <h3>5-Day Forecast</h3>
          <div class="row align-items-start" id="beginDay">
        `);
        $('#category').append(currentWeatherCard);
      }


      getFutureAPI(lat, lon);

  })
}

function getFutureAPI(lat, lon) {
  fetchFutureURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
  fetch(fetchFutureURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.list[0].weather[0].icon);
      var dayCount = 1;
      var hourIter = 1;
      
      if (fiveDay === "") {
        fiveDay = $(`<div class="container text-center">
        <h3>5-Day Forecast</h3>
        <div class="row align-items-start" id="beginDay">`);

        $('#dataCard').append(fiveDay);
      }
      else {
        fiveDay.remove();
        console.log("remove fiveDay");
        fiveDay = $(`<div class="container text-center">
        <h3>5-Day Forecast</h3>
        <div class="row align-items-start" id="beginDay">`);
        // $('#dataCard').append(fiveDay);
      }
      
      // $('#dataCard').append(fiveDay);
      for (var j = 0; j < 5; j++) {
        var nextDay = currentTime.add(dayCount, 'day').format("MM/DD/YYYY");
        dayCount++;
        console.log("nextDay: " + nextDay);
        var nextIcon = data.list[hourIter].weather[0].icon;
        var nextIconURL = "http://openweathermap.org/img/w/" + nextIcon + ".png";
        console.log("nextIconURL: " + nextIconURL);
        var nextTemp = kelvinToF(data.list[hourIter].main.temp);
        console.log("nextTemp: " + nextTemp);
        var nextWind = data.list[hourIter].wind.speed;
        console.log("nextWind: " + nextWind);
        var nextHum = data.list[hourIter].main.humidity;
        console.log("nextHum: " + nextHum);
        console.log("hourIter: " + hourIter);
        console.log("dayCount: " + dayCount);
        nextDayCard = $(`<div class="col">
        <h4>${nextDay}</h4>
        <img id="icons" src="${nextIconURL}">
          <p>Temp: ${nextTemp}&#8457;</p>
          <p>Wind: ${nextWind} MPH</p>
          <p>Humidity: ${nextHum}%</p>
          </div>`);

        $('#beginDay').append(nextDayCard); hourIter = hourIter + 8;
        
        // if (hourIter < 6) {
          
          
        // }

        // else {
        //   hourIter++;
        //   nextDayCard.remove();
        //   console.log("remove nextDayCard")
        //   nextDayCard = $(`<div class="col">
        //   <h4>${nextDay}</h4>
        //   <img id="icons" src="${nextIconURL}">
        //     <p>Temp: ${nextTemp}&#8457;</p>
        //     <p>Wind: ${nextWind} MPH</p>
        //     <p>Humidity: ${nextHum}%</p>
        // </div>`);


        //   $('#beginDay').append(nextDayCard);
        // }

        // nextDayCard = $(`<div class="col">
        //   <h4>${nextDay}</h4>
        //   <img id="icons" src="${nextIconURL}">
        //     <p>Temp: ${nextTemp}&#8457;</p>
        //     <p>Wind: ${nextWind} MPH</p>
        //     <p>Humidity: ${nextHum}%</p>
        // </div>`);

        // $('#beginDay').append(nextDayCard);
      }
    })
}

function kelvinToF(kDegree) {
  var fDegree = ((kDegree - 273.15) * (9 / 5) + 32).toFixed(2);
  return fDegree;
}

apiBtn.on("click", getCurrentApi);

// console.log(kelvinToF(275));

console.log(currentTime.add(1, 'day').format("MM/DD/YYYY"));