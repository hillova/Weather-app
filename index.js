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

function showForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="col-2 daily-forecast">
        <div class="forecast-day">${day}</div>
        <img src="http://openweathermap.org/img/wn/01d.png" width="50px" />
        <div class="forecast-day-temp">
          <span class="max-temp">18°</span>
          <span class="min-temp">12°</span>
        </div>
     </div>`;
  });
  forecastHtml = forecastHtml + `</div>`;

  forecastElement.innerHTML = forecastHtml;
}

let submitButton = document.querySelector("form");
submitButton.addEventListener("submit", handleSubmit);

showCity("Prague");
showForecast();
