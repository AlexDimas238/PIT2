// Função para buscar a localização do usuário e carregar o clima automaticamente
function getUserLocationAndWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coordinates = `${latitude},${longitude}`;
        getWeather(coordinates); // Chama a função para buscar o clima com as coordenadas
      },
      (error) => {
        console.error("Erro ao obter localização do usuário:", error);
        alert(
          "Não foi possível obter sua localização. Selecione uma cidade manualmente."
        );
      }
    );
  } else {
    alert(
      "Geolocalização não é suportada pelo seu navegador. Selecione uma cidade manualmente."
    );
  }
}

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

    // Exibir os detalhes do clima no HTML
    weatherDiv.innerHTML = `
    <p>${data.temperature}</p>
    <p>Sensação: ${data.realFeelTemperature}</p>
    <p>Umidade: ${data.humidity}</p>
    <p>Vento: ${data.windSpeed} </p>
    `;
  } catch (error) {
    console.error("Erro ao buscar o clima:", error);
  }
}

// Inicializar o carregamento das capitais, data/hora e a geolocalização
document.addEventListener("DOMContentLoaded", () => {
  loadCapitais(); // Carregar a lista de capitais
  getUserLocationAndWeather(); // Tentar carregar o clima com base na localização do usuário
});

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
