function showCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city");
  let heading = document.querySelector("h1");
  heading.innerHTML = `${input.value}`;
  let city = input.value;
  let units = "metric";
  let apiKey = "9d6be2d6ae989b89ba01f7b622ef3053";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(changeData);
}

function changeData(response) {
  let tempElement = document.querySelector(".temperature");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  windElement.innerHTML = `${wind} km/h`;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `${humidity} %`;
  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#weather-icon");
  let weatherImage = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherImage}.png`
  );
}

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
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();

let currentDate = document.querySelector("h2");
currentDate.innerHTML = `${day}, ${hours}:${minutes}`;

let submitButton = document.querySelector("form");
submitButton.addEventListener("submit", showCity);
