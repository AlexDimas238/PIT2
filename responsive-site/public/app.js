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
  async function getWeather(coordinates) {
    try {
      const response = await fetch(`/weather?coordinates=${coordinates}`);
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

  // Função para carregar dinamicamente a lista de capitais
  async function loadCapitais() {
    try {
      const response = await fetch("/capitais");
      const capitais = await response.json();
      const citySelect = document.getElementById("city-select");
      capitais.forEach((capital) => {
        const option = document.createElement("option");
        option.value = capital.coordenadas;
        option.textContent = capital.nome;
        citySelect.appendChild(option);
      });
    } catch (error) {
      console.error("Erro ao carregar as capitais:", error);
    }
  }

  // Evento para exibir o clima ao clicar no botão
  document.getElementById("confirm-city-btn").addEventListener("click", () => {
    const citySelect = document.getElementById("city-select");
    const coordinates = citySelect.value;
    getWeather(coordinates); // Envia as coordenadas para a função getWeather
  });

  // Carregar a lista de capitais ao iniciar a página
  loadCapitais();

  // Carrega o clima para uma localização padrão ao iniciar a página (Brasília)
  getWeather("-15.7801,-47.9292");
});
