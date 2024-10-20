const axios = require("axios");
require("dotenv").config(); // Carregar as variáveis de ambiente do .env

// Função para obter condições climáticas atuais para uma localização (coordenadas)
async function getWeather(latitude, longitude) {
  const apiKey = process.env.AZURE_API_KEY; // Obter chave de API do arquivo .env
  const url = `https://atlas.microsoft.com/weather/currentConditions/json?api-version=1.1&query=${latitude},${longitude}&unit=metric&details=true`;

  try {
    const response = await axios.get(url, {
      headers: {
        "subscription-key": apiKey, // Usar a chave de API do ambiente
      },
    });
    const weatherData = response.data.results[0];
    return {
      dateTime: weatherData.dateTime,
      phrase: weatherData.phrase,
      temperature: `${weatherData.temperature.value} °C`,
      realFeelTemperature: `${weatherData.realFeelTemperature.value} °C`,
      windSpeed: `${weatherData.wind.speed.value} km/h`,
      humidity: `${weatherData.relativeHumidity}%`,
    };
  } catch (error) {
    console.error("Erro ao buscar dados do clima:", error);
    return { weather: "Clima indisponível" };
  }
}

module.exports = getWeather;
