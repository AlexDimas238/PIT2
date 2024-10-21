async function getWeather(coordinates) {
  try {
    const response = await fetch(`/weather?coordinates=${coordinates}`);
    const data = await response.json();

    const weatherDiv = document.getElementById("weather-details");

    // Verificar se o elemento está presente no DOM
    if (!weatherDiv) {
      console.error("Elemento de clima não encontrado no DOM.");
      return;
    }

    // Definir a cor da temperatura com base no valor
    const temperatureColor =
      data.temperature >= 30
        ? "red"
        : data.temperature <= 15
        ? "blue"
        : "orange";
    const realFeelColor =
      data.realFeelTemperature >= 30
        ? "red"
        : data.realFeelTemperature <= 15
        ? "blue"
        : "orange";
    const humidityColor =
      data.humidity >= 70 ? "blue" : data.humidity <= 30 ? "orange" : "green";
    const windColor =
      data.windSpeed >= 20
        ? "purple"
        : data.windSpeed <= 5
        ? "green"
        : "orange";

    // Estilizar e exibir as informações do clima
    weatherDiv.innerHTML = `
      <div class="weather-item" style="color: ${temperatureColor};">
        <p>Temperatura: ${data.temperature}°C</p>
      </div>
      <div class="weather-item" style="color: ${realFeelColor};">
        <p>Sensação Térmica: ${data.realFeelTemperature}°C</p>
      </div>
      <div class="weather-item" style="color: ${humidityColor};">
        <p>Umidade: ${data.humidity}%</p>
      </div>
      <div class="weather-item" style="color: ${windColor};">
        <p>Velocidade do Vento: ${data.windSpeed} km/h</p>
      </div>
    `;
  } catch (error) {
    console.error("Erro ao buscar o clima:", error);
  }
}

// Evento para capturar o clique no botão de confirmação da cidade
document.getElementById("confirm-city-btn").addEventListener("click", () => {
  const citySelect = document.getElementById("city-select");
  const coordinates = citySelect.value;
  if (coordinates) {
    getWeather(coordinates); // Busca o clima com base nas coordenadas selecionadas
  } else {
    alert("Por favor, selecione uma cidade válida.");
  }
});
