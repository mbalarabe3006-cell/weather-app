

const apiKey = "91500758f9d5a120cda8b1edb8581910";

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city === "") {
    alert("Please enter a city name");
    return;
  }
  getWeather(city);
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      document.getElementById("weatherResult").innerHTML = `<p>City not found ❌</p>`;
      return;
    }

    const weatherHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p>${data.main.temp.toFixed(1)}°C</p>
      <p>${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} km/h</p>
    `;

    document.getElementById("weatherResult").innerHTML = weatherHTML;
  } catch (error) {
    console.error("Error fetching weather:", error);
    document.getElementById("weatherResult").innerHTML = `<p>Something went wrong. Please try again.</p>`;
  }
}
