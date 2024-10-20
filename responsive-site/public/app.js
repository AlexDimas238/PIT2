document.addEventListener("DOMContentLoaded", () => {
  // Exibe data e hora no formato brasileiro
  function updateDateTime() {
    const now = new Date();
    const datetimeDiv = document.getElementById("datetime");
    datetimeDiv.textContent = now.toLocaleString("pt-BR", {
      dateStyle: "full",
      timeStyle: "medium",
    });
  }
  setInterval(updateDateTime, 1000); // Atualiza a cada segundo

  // Função para obter e exibir o clima com base nas coordenadas fornecidas
  async function getWeather(latitude, longitude) {
    try {
      const response = await fetch(
        `/weather?latitude=${latitude}&longitude=${longitude}`
      );
      const data = await response.json();
      const weatherDiv = document.getElementById("weather");
      weatherDiv.textContent = `
              Clima: ${data.phrase}, Temperatura: ${data.temperature}, Sensação térmica: ${data.realFeelTemperature},
              Vento: ${data.windSpeed}, Umidade: ${data.humidity}
          `;
    } catch (error) {
      console.error("Erro ao buscar o clima:", error);
    }
  }

  // Carrega o clima para uma localização padrão ao iniciar a página (São Paulo)
  getWeather("-23.5505", "-46.6333");

  // Exibe clima ao confirmar as coordenadas da cidade
  document.getElementById("confirm-city-btn").addEventListener("click", () => {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    getWeather(latitude, longitude);
  });
});
