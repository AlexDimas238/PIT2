const axios = require("axios");

async function getWeather(city = "São Paulo") {
  const apiKey = "SUA_API_KEY_AQUI"; // Coloque sua chave de API aqui
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;
    return {
      weather: `${weatherData.weather[0].description}, ${weatherData.main.temp}°C`,
    };
  } catch (error) {
    console.error("Erro ao buscar dados do clima:", error);
    return { weather: "Clima indisponível" };
  }
}

module.exports = getWeather;
