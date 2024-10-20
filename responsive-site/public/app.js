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

  // Adicionando evento de clique ao botão de confirmar cidade
  const confirmCityButton = document.getElementById("confirm-city-btn");
  confirmCityButton.addEventListener("click", () => {
    const citySelect = document.getElementById("city-select");
    const selectedCity = citySelect.value;
    getWeather(selectedCity); // Atualiza o clima da cidade selecionada
  });

  // Carrega o clima da cidade padrão (São Paulo) ao iniciar a página
  getWeather("São Paulo");

  // Gerenciamento de tarefas
  const taskList = [];
  const taskUl = document.getElementById("tasks");

  // Função para renderizar as tarefas na lista
  function renderTasks() {
    taskUl.innerHTML = ""; // Limpa a lista antes de renderizar novamente
    taskList.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = `${task.name} - ${task.time}`;
      taskUl.appendChild(li);
    });
  }

  // Função para adicionar uma nova tarefa
  function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskTimeInput = document.getElementById("task-time");

    // Verifica se o campo da tarefa não está vazio
    if (taskInput.value.trim() !== "" && taskTimeInput.value !== "") {
      taskList.push({
        name: taskInput.value,
        time: taskTimeInput.value,
      });
      renderTasks(); // Atualiza a lista de tarefas
      taskInput.value = ""; // Limpa o campo de texto
      taskTimeInput.value = ""; // Limpa o campo de horário
    } else {
      alert("Por favor, preencha a tarefa e o horário.");
    }
  }

  // Adicionando evento de clique ao botão de adicionar tarefa
  const addTaskButton = document.getElementById("add-task-btn");
  addTaskButton.addEventListener("click", addTask);
});
