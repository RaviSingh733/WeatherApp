const apiKey = "d2161dc861b6d1b196418525e1d94c8b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const locationBtn = document.querySelector(".location-btn");
const weatherIcon = document.querySelector(".weather-icon");
const loader = document.querySelector(".loader");

const TIMEOUT = 10000;

async function getWeatherByCity(city) {
  loader.style.display = "block";
  document.querySelector(".weather").style.display = "none";
  document.querySelector(".error").style.display = "none";

  const controller = new AbortController(); 
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT); 

  try {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`, { signal: controller.signal });

    clearTimeout(timeoutId); 

    loader.style.display = "none";

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "img/clouds.png";
      } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "img/clear.png";
      } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "img/rain.png";
      } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "img/drizzle.png";
      } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "img/mist.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } 
  catch (error) {
    clearTimeout(timeoutId); 
    loader.style.display = "none";
    
    if (error.name === 'AbortError') {
      document.querySelector(".error").textContent = "Request timed out. Please try again.";
    } else {
      document.querySelector(".error").textContent = "Request timed out. PLease Check Your Internet Connection";
    }
    
    
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

async function getWeatherByLocation(latitude, longitude) {
  loader.style.display = "block";
  document.querySelector(".weather").style.display = "none";
  document.querySelector(".error").style.display = "none";

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(`${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`, { signal: controller.signal });

    clearTimeout(timeoutId);

    loader.style.display = "none";

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "img/clouds.png";
      } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "img/clear.png";
      } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "img/rain.png";
      } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "img/drizzle.png";
      } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "img/mist.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    clearTimeout(timeoutId);
    loader.style.display = "none";
    
    if (error.name === 'AbortError') {
      document.querySelector(".error").textContent = "Request timed out. Please try again.";
    } else {
      document.querySelector(".error").textContent = "Error fetching weather data.";
    }

    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

function getLocationAndWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherByLocation(latitude, longitude);
    }, (error) => {
      console.error("Error getting location: ", error);
      document.querySelector(".error").style.display = "block";
      loader.style.display = "none";
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    getWeatherByCity(city);
  }
});

locationBtn.addEventListener("click", () => {
  getLocationAndWeather();
});
