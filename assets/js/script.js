var apiBtn = $('#cityBtn');
const APIKey = "3d7566facda6094f6f38d4d79a1026a7";
var city = "London";
var currentTime = dayjs();

var fetchURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

function getApi() {
  fetch(fetchURL)
    .then(function (repsonse) {
      return repsonse.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.main.temp)

      var currentDate = currentTime.format("MM/DD/YYYY");
      var currentTemp = kelvinToF(data.main.temp);
      var currentWind = data.wind.speed;
      var currentHumidity = data.main.humidity;
      var currentIcon = data.weather[0].icon;
      console.log(currentIcon);
      var currentIconURL = "http://openweathermap.org/img/w/" + currentIcon + ".png";

      currentWeatherCard = $(`<div class="col" id="dataCard">
        <div id="topCard">
          <h2>${city} ${currentDate}<img id="icon" src=${currentIconURL} alt="Weather Icon"></h2>
          <p>Temp: ${currentTemp}&#8457;</p>
          <p>Wind: ${currentWind} MPH</p>
          <p>Humidity: ${currentHumidity}%</p>
        </div>
        <div id="fiveDay">
          <h3>5-Day Forecast</h3>

        </div>`);

      $('#category').append(currentWeatherCard);
  })
}

function kelvinToF(kDegree) {
  var fDegree = ((kDegree - 273.15) * (9 / 5) + 32).toFixed(2);
  return fDegree;
}

apiBtn.on("click", getApi);

// console.log(kelvinToF(275));