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
    return daysOfWeek[date.getDay()];
  }

  // Exibe data e hora no formato brasileiro
  function updateDateTime() {
    const now = new Date();
    const dayOfWeek = getDayOfWeek(now);
    const formattedDate = now.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("pt-BR");

    const datetimeDiv = document.getElementById("datetime");
    if (datetimeDiv) {
      datetimeDiv.textContent = `${dayOfWeek}, ${formattedDate} ${formattedTime}`;
    }
  }

  setInterval(updateDateTime, 1000); // Atualiza a cada segundo

  // Função para carregar a lista de capitais
  async function loadCapitais() {
    try {
      const response = await fetch("/capitais");
      if (!response.ok) throw new Error("Erro ao buscar capitais");
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
  document.addEventListener("DOMContentLoaded", loadCapitais);

  // Função para adicionar uma nova tarefa
  const taskList = [];
  const taskUl = document.getElementById("tasks");

  function renderTasks() {
    taskUl.innerHTML = "";
    taskList.sort((a, b) => a.time.localeCompare(b.time));
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

  function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskTimeInput = document.getElementById("task-time");
    const taskDescription = taskInput.value.trim();

    if (/^[a-zA-Z\s]+$/.test(taskDescription) && taskTimeInput.value !== "") {
      taskList.push({ name: taskDescription, time: taskTimeInput.value });
      renderTasks();
      taskInput.value = "";
      taskTimeInput.value = "";
    } else {
      alert(
        "Por favor, preencha a tarefa com texto válido e selecione um horário."
      );
    }
  }

  document.getElementById("add-task-btn").addEventListener("click", addTask);

  loadCapitais();
});
