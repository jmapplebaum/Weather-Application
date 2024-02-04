function refreshWeather(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city-element");
    let conditionElement = document.querySelector("#condition");
let humidityElement = document.querySelector("#humidity");
let windSpeedElement = document.querySelector("#wind-speed");
let timeElement = document.querySelector("#current-time");
let date = new Date(response.data.time * 1000)
let emojiElement = document.querySelector("#emoji");

emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="emoji" />`;
    
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    conditionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
    temperatureElement.innerHTML = Math.round(temperature);

}
function formatDate(date) {
let minutes = date.getMinutes();
let hours = date.getHours();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];

if (minutes <10) {
    minutes = `0${minutes}`;
}
return `${day} ${hours}:${minutes},`;
}

function searchCity(city) {
let apiKey = "5b4802f40a5b2aoe7a3t7b824a662fdf";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`
axios.get(apiUrl).then(refreshWeather);
}


function searchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    
    searchCity(searchInput.value);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", searchSubmit);

searchCity("Chicago");