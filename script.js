window.onload = function () {
  document.querySelector("button").addEventListener("click", getWeather);
};

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "8e8f4c4943e1183676d820437eb2e57b"; // use your actual key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      document.getElementById("weatherResult").innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Condition: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
      `;
    } else {
      document.getElementById("weatherResult").innerHTML = `<p>City not found. Try again.</p>`;
    }
  } catch (error) {
    console.error(error);
    document.getElementById("weatherResult").innerHTML = `<p>Error fetching weather data.</p>`;
  }
}

