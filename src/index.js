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
  let temperature = Math.round(response.data.main.temp);
  let tempNumber = document.querySelector("#temp-number");
  tempNumber.innerHTML = temperature;
}

function getPosition(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getPosition);

function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-value");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchInput.value}`;
  let apiUrlName = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=8eb322b04629a0b2fdac0ac79561148e&units=metric`;
  axios.get(apiUrlName).then(changeTemp);
}

function changeTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempNumber = document.querySelector("#temp-number");
  let weatherIcon = document.querySelector("#icon");
  tempNumber.innerHTML = temperature;
  weatherIcon.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/10d@2x.png`
  );
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", changeCity);

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
