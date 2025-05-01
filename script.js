let apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
let apiKey = "8ce0a0d3e2170554c071035f529f32e2"
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("keyword");
const weatherInfo = document.getElementById("weatherInfo");
searchBtn.addEventListener("click", function () {
    let city = searchInput.value;
    document.getElementById("city").innerHTML = city.toUpperCase();
    console.log(city);
    if (city) {
        fetchWeatherData(city);
    }
}
);
keyword.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
}
);
async function fetchWeatherData(city) {
    try {
        const response = await fetch(apiURL + "&q=" + city + "&appid=" + apiKey);
        const data = await response.json();
        console.log(data);
        displayWeatherData(data);

    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherInfo.innerHTML = "Error fetching weather data. Please try again.";

    }
}
function displayWeatherData(data) {
    if (data.cod === 200) {
        let temprature = data.main.temp
        document.getElementById("temp").innerHTML = Math.round(temprature) + "°C";
        let weather = data.weather[0].description;
        document.getElementById("weather").innerHTML = weather.toUpperCase();
        if (weather.includes("rain")) {
            document.getElementById("img").src = "rainy.png";
            
        }
    if (weather.includes("clear")) {
        document.getElementById("img").src = "sunny.svg";
    }
    if (weather.includes("cloud")) {
        document.getElementById("img").src = "clouds.png";
    }
    if (weather.includes("scattered")) {        
        document.getElementById("img").src = "scattred.png";
    }
    let feels = data.main.feels_like
    document.getElementById("feels").innerHTML = "Feels like: " + Math.round(feels) + "°C";
    let humidity = data.main.humidity
    document.getElementById("humidity").innerHTML = "Humidity: " + humidity + "%";
    let wind = data.wind.speed
    document.getElementById("wind").innerHTML = "Wind: " + Math.round(wind) + " km/h";
}}
