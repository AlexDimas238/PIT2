const express = require("express");
const path = require("path");
const getWeather = require("./weather"); // Importando a função que busca o clima

const app = express();
const PORT = 3000;

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, "../public")));

// Rota para obter o clima com base nas coordenadas
app.get("/weather", async (req, res) => {
  const latitude = req.query.latitude || "-23.5505"; // Latitude padrão (São Paulo)
  const longitude = req.query.longitude || "-46.6333"; // Longitude padrão (São Paulo)
  try {
    const weatherData = await getWeather(latitude, longitude);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o clima" });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
