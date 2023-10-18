var apiBtn = $('#cityBtn');
const APIKey = "3d7566facda6094f6f38d4d79a1026a7";
var city = $('#city-text').val();
console.log("city: " + city);
var currentTime = dayjs();
var currentWeatherCard = '';
var long = 0;
var lat = 0;

var fetchCurrentURL = "";

var fetchFutureURL = "";

function getCurrentApi() {
  // if (currentWeatherCard != undefined) {
  //   currentWeatherCard.remove();
  // }
  city = $('#city-text').val();
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
        `);
        $('#category').append(currentWeatherCard);
      }

      
      
      //currentWeatherCard.remove();


      //getFutureAPI();

  })
}

function getFutureAPI() {
  city = $('#city-text').val();
  fetchFutureURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
  fetch(fetchFutureURL)
    .then(function (repsonse) {
      return repsonse.json();
    })
    .then(function (data) {
      console.log(data)
    })
}

function kelvinToF(kDegree) {
  var fDegree = ((kDegree - 273.15) * (9 / 5) + 32).toFixed(2);
  return fDegree;
}

apiBtn.on("click", getCurrentApi);

// console.log(kelvinToF(275));

console.log(currentTime.add(1, 'day'));