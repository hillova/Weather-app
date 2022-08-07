function formatDate(timestamp) {
  let today = new Date(timestamp);
  let hours = today.getHours();
  let minutes = today.getMinutes();
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
  let day = days[today.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "9d6be2d6ae989b89ba01f7b622ef3053";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function changeData(response) {
  let tempElement = document.querySelector(".temperature");
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  let descriptionElement = document.querySelector(".description");
  let iconElement = document.querySelector("#weather-icon");
  let weatherImage = response.data.weather[0].icon;
  let dateElement = document.querySelector("#last-updated");

  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = `${temperature}°C`;
  windElement.innerHTML = `${wind} km/h`;
  humidityElement.innerHTML = `${humidity} %`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherImage}.png`
  );
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
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

function showForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHtml =
        forecastHtml +
        `<div class="col-2 daily-forecast">
        <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
         <img src="http://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }.png" width="50px" />
        <div class="forecast-day-temp">
          <span class="max-temp">${Math.round(forecastDay.temp.max)}°</span>
         
          <span class="min-temp">${Math.round(forecastDay.temp.min)}°</span>
        </div>
     </div>`;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

let submitButton = document.querySelector("form");
submitButton.addEventListener("submit", handleSubmit);

showCity("Prague");
