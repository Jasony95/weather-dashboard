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
var cityBtn = $('.newCityBtn');
var cityArr = [];
var cities = 'cities';
var fetchCurrentURL = "";
var fetchFutureURL = "";
var newCityBtn = $('.newCityBtn');
var arrayStorage = JSON.parse(localStorage.getItem(cities));
var arrayStorageLength = 0;

console.log(arrayStorage);

if (arrayStorage != null) {
  arrayStorageLength = arrayStorage.length;
  arrayStorage.forEach((cityName) => {
    var newCityBtn = $(`<input type="button" class="newCityBtn" id="uni" value='${cityName}'>`);
    $("#searchCard").append(newCityBtn);
  })
}

if (arrayStorage === null) {
  arrayStorage = [];
}

console.log(arrayStorage);
console.log(arrayStorageLength);



function getCurrentApi() {
  city = $('#city-text').val();
  // var city = "Saint Paul";
  if (city === '') {
    alert("Please type in a city.");
    return;
  }
  fetchCurrentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  fetch(fetchCurrentURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(cityArr);
      cityArr = arrayStorage;
      console.log(cityArr);
      console.log("Local Length: " + arrayStorageLength);
      var currentDate = currentTime.format("MM/DD/YYYY");
      var currentTemp = kelvinToF(data.main.temp);
      var currentWind = data.wind.speed;
      var currentHumidity = data.main.humidity;
      var currentIcon = data.weather[0].icon;
      var currentIconURL = "http://openweathermap.org/img/w/" + currentIcon + ".png";
      lat = data.coord.lat.toFixed(2);
      lon = data.coord.lon.toFixed(2);

      if (currentWeatherCard === "") {
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
        fiveDay = $(`<div class="container text-center">
        <h3>5-Day Forecast</h3>
        <div class="row align-items-start" id="beginDay">`);
      }
      
      for (var j = 0; j < 5; j++) {
        var nextDay = currentTime.add(dayCount, 'day').format("MM/DD/YYYY");
        dayCount++;
        var nextIcon = data.list[hourIter].weather[0].icon;
        var nextIconURL = "http://openweathermap.org/img/w/" + nextIcon + ".png";
        var nextTemp = kelvinToF(data.list[hourIter].main.temp);
        var nextWind = data.list[hourIter].wind.speed;
        var nextHum = data.list[hourIter].main.humidity;
        nextDayCard = $(`<div class="col">
        <h4>${nextDay}</h4>
        <img id="icons" src="${nextIconURL}">
          <p>Temp: ${nextTemp}&#8457;</p>
          <p>Wind: ${nextWind} MPH</p>
          <p>Humidity: ${nextHum}%</p>
          </div>`);

        $('#beginDay').append(nextDayCard);
        hourIter = hourIter + 8;
      }

      addCityBtn(city);
    }
  )
    
}

function addCityBtn(city) {
  var newCityBtn = $(`<input type="button" class="newCityBtn" id="uni" value='${city}'>`);
  console.log(localStorage.getItem(cities));
  if (localStorage.getItem(cities)===null) {
    console.log("added " + city);
    $("#searchCard").append(newCityBtn);
    cityArr.push(city);
  }
  else if (localStorage.getItem(cities).includes(city)) {
    console.log(city + " is duplicated.");
    return;
  }
  else {
    $("#searchCard").append(newCityBtn);
    cityArr.push(city);
  }
  localStorage.setItem(cities, JSON.stringify(cityArr));
  console.log("after adding button " + localStorage.getItem(cities));
}

function runSearch(city) {
  console.log('function running.');
  for (var i = 0; i < cityArr.length; i++) {
    if (cityArr[i].includes(city)) {
      console.log("City in localstorage");
    }
  }
}

function kelvinToF(kDegree) {
  var fDegree = ((kDegree - 273.15) * (9 / 5) + 32).toFixed(2);
  return fDegree;
}

apiBtn.on("click", getCurrentApi);

$(document).ready(function() {
  $(document).on("click", "input.newCityBtn", runCard);
})




function runCard(event) {
  event.preventDefault();
  city = $(this).val();
  fetchCurrentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  fetch(fetchCurrentURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(cityArr);
      cityArr = arrayStorage;
      console.log(cityArr);
      console.log("Local Length: " + arrayStorageLength);
      var currentDate = currentTime.format("MM/DD/YYYY");
      var currentTemp = kelvinToF(data.main.temp);
      var currentWind = data.wind.speed;
      var currentHumidity = data.main.humidity;
      var currentIcon = data.weather[0].icon;
      var currentIconURL = "http://openweathermap.org/img/w/" + currentIcon + ".png";
      lat = data.coord.lat.toFixed(2);
      lon = data.coord.lon.toFixed(2);

      if (currentWeatherCard === "") {
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


      getFutureAPI2(lat, lon);

    })
}

function getFutureAPI2(lat, lon) {
  fetchFutureURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
  fetch(fetchFutureURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
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
        fiveDay = $(`<div class="container text-center">
        <h3>5-Day Forecast</h3>
        <div class="row align-items-start" id="beginDay">`);
      }

      for (var j = 0; j < 5; j++) {
        var nextDay = currentTime.add(dayCount, 'day').format("MM/DD/YYYY");
        dayCount++;
        var nextIcon = data.list[hourIter].weather[0].icon;
        var nextIconURL = "http://openweathermap.org/img/w/" + nextIcon + ".png";
        var nextTemp = kelvinToF(data.list[hourIter].main.temp);
        var nextWind = data.list[hourIter].wind.speed;
        var nextHum = data.list[hourIter].main.humidity;
        nextDayCard = $(`<div class="col">
        <h4>${nextDay}</h4>
        <img id="icons" src="${nextIconURL}">
          <p>Temp: ${nextTemp}&#8457;</p>
          <p>Wind: ${nextWind} MPH</p>
          <p>Humidity: ${nextHum}%</p>
          </div>`);

        $('#beginDay').append(nextDayCard);
        hourIter = hourIter + 8;
      }

    
    }
    )

}

function showCitiesBtn() {

    console.log(arrayStorageLength);
    if (arrayStorageLength != 0) {
      arrayStorage.forEach((cityName) => {
        var newCityBtn = $(`<button type="button" class="newCityBtn">${cityName}</button>`);
        $("#searchCard").append(newCityBtn);
      })
    }

  
}

