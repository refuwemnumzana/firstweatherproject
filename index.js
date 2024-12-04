let apiKey = "1f1767o48c592t883414d34c98adb09b";
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric";

function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");
  let cityInput = searchInputElement.value.trim();

  if (cityInput) {
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = cityInput;

    apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);

    searchInputElement.value = "";
  } else {
    displayError("Please enter a city name.");
  }
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formattedDay = days[date.getDay()];

  return `${formattedDay} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;

  let temperatureElement = document.querySelector(".current-temperature-value");
  temperatureElement.innerHTML = temperature;

  let errorElement = document.querySelector("#error-message");
  errorElement.innerHTML = "";
}

function displayError(message) {
  let errorElement = document.querySelector("#error-message");
  errorElement.innerHTML = message;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
