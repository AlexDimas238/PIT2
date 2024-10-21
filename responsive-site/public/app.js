document.addEventListener("DOMContentLoaded", () => {
  // Função para obter o nome do dia da semana em português
  function getDayOfWeek(date) {
    const daysOfWeek = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    return daysOfWeek[date.getDay()]; // Retorna o nome do dia com a primeira letra já maiúscula
  }

  // Exibe data e hora no formato brasileiro
  function updateDateTime() {
    const now = new Date();
    const dayOfWeek = getDayOfWeek(now); // Obtém o dia da semana
    const formattedDate = now.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("pt-BR");

    const datetimeDiv = document.getElementById("datetime");
    datetimeDiv.textContent = `${dayOfWeek}, ${formattedDate} ${formattedTime}`;
  }

  setInterval(updateDateTime, 1000); // Atualiza a cada segundo

  // Função para carregar dinamicamente a lista de capitais do backend
  async function loadCapitais() {
    try {
      const response = await fetch("/capitais"); // Requisição para o backend que fornece a lista de capitais
      const capitais = await response.json();
      const citySelect = document.getElementById("city-select");
      capitais.forEach((capital) => {
        const option = document.createElement("option");
        option.value = capital.coordenadas; // Definindo as coordenadas como valor
        option.textContent = capital.nome; // Nome da capital
        citySelect.appendChild(option);
      });
    } catch (error) {
      console.error("Erro ao carregar as capitais:", error);
    }
  }

  // Evento para obter o clima ao clicar no botão de confirmação
  document.getElementById("confirm-city-btn").addEventListener("click", () => {
    const citySelect = document.getElementById("city-select");
    const coordinates = citySelect.value; // Obtém as coordenadas da cidade selecionada
    getWeather(coordinates); // Função para buscar o clima
  });

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

  // Carregar a lista de capitais ao iniciar a página
  loadCapitais();

  // Gerenciamento de Tarefas
  const taskList = []; // Array para armazenar as tarefas
  const taskUl = document.getElementById("tasks");

  // Função para renderizar as tarefas na lista
  function renderTasks() {
    taskUl.innerHTML = ""; // Limpa a lista antes de renderizar novamente
    taskList.sort((a, b) => a.time.localeCompare(b.time)); // Ordena por horário
    taskList.forEach((task) => {
      const row = document.createElement("tr");
      const descriptionCell = document.createElement("td");
      const timeCell = document.createElement("td");

      descriptionCell.textContent = task.name.toUpperCase();
      timeCell.textContent = task.time;

      row.appendChild(descriptionCell);
      row.appendChild(timeCell);
      taskUl.appendChild(row);
    });
  }

  // Função para adicionar uma nova tarefa
  function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskTimeInput = document.getElementById("task-time");
    const taskDescription = taskInput.value.trim();

    // Verifica se o campo da tarefa não está vazio
    if (/^[a-zA-Z\s]+$/.test(taskDescription) && taskTimeInput.value !== "") {
      taskList.push({
        name: taskDescription,
        time: taskTimeInput.value,
      });
      renderTasks(); // Atualiza a lista de tarefas
      taskInput.value = ""; // Limpa o campo de texto
      taskTimeInput.value = ""; // Limpa o campo de horário
    } else {
      alert(
        "Por favor, preencha a tarefa com texto válido e selecione um horário."
      );
    }
  }

  // Evento de clique no botão de adicionar tarefa
  document.getElementById("add-task-btn").addEventListener("click", addTask);

  // Carrega o clima para uma localização padrão ao iniciar a página (Brasília)
  getWeather("-15.7801,-47.9292");
});
