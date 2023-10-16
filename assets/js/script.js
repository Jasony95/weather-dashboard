var apiBtn = $('#cityBtn');
const APIKey = "3d7566facda6094f6f38d4d79a1026a7";
var city = "London";

var fetchURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

function getApi() {
  fetch(fetchURL)
    .then(function (repsonse) {
      return repsonse.json();
    })
    .then(function (data) {
    console.log(data);
  })
}

apiBtn.on("click", getApi);