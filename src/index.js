function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8eb322b04629a0b2fdac0ac79561148e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let currentCity = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${currentCity}`;
  let celsiusTemperature = Math.round(response.data.main.temp);
  let tempNumber = document.querySelector("#temp-number");
  let weatherIcon = document.querySelector("#icon");
  tempNumber.innerHTML = celsiusTemperature;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function getPosition(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getPosition);

function changeCity(city) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${city}`;
  let apiUrlName = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8eb322b04629a0b2fdac0ac79561148e&units=metric`;
  axios.get(apiUrlName).then(changeTemp);

  apiUrlName = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8eb322b04629a0b2fdac0ac79561148e&units=metric`;
  axios.get(apiUrlName).then(showIcon);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-value");
  changeCity(searchInput.value);
}

function showIcon(response) {
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function changeTemp(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let tempNumber = document.querySelector("#temp-number");
  tempNumber.innerHTML = celsiusTemperature;
}
function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let tempNumber = document.querySelector("#temp-number");
  tempNumber.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  let tempNumber = document.querySelector("#temp-number");
  tempNumber.innerHTML = celsiusTemperature;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);

let celsiusTemperature = null;

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hour = now.getHours();
let minute = now.getMinutes();
let h3 = document.querySelector("h3");
h3.innerHTML = `${day} ${hour}:${minute}`;

changeCity("New York");
