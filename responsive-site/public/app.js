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

  // Função para obter e exibir o clima com base na cidade selecionada
  async function getWeather(city) {
    try {
      const response = await fetch(`/weather?city=${city}`);
      const data = await response.json();
      const weatherDiv = document.getElementById("weather");
      weatherDiv.textContent = `Clima em ${city}: ${data.weather}`;
    } catch (error) {
      console.error("Falha ao buscar o clima:", error);
    }
  }

  // Elemento seletor de cidades
  const citySelect = document.getElementById("city-select");
  citySelect.addEventListener("change", (event) => {
    const selectedCity = event.target.value;
    getWeather(selectedCity); // Atualiza o clima quando a cidade é alterada
  });

  // Carrega o clima da cidade padrão (São Paulo)
  getWeather(citySelect.value);
});
