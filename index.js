function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDate()];
  return `${day} ${hours}:${minutes}`;
}

function changeData(response) {
  let tempElement = document.querySelector(".temperature");
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  tempElement.innerHTML = `${temperature}°C`;
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
  let dateElement = document.querySelector("#last-updated");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function showCity(city) {
  let units = "metric";
  let apiKey = "9d6be2d6ae989b89ba01f7b622ef3053";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(changeData);
}

function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  showCity(input.value);
}

let submitButton = document.querySelector("form");
submitButton.addEventListener("submit", handleSubmit);

showCity("Prague");
