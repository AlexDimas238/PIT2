const express = require("express");
const path = require("path");
const getWeather = require("./weather");
const capitaisBrasileiras = require("./capitaisBrasileiras"); // Importando a lista de capitais

const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, "../public")));

// Exemplo de rota simples
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Rota para obter o clima com base nas coordenadas
app.get("/weather", async (req, res) => {
  const coordinates = req.query.coordinates;
  if (!coordinates) {
    return res.status(400).json({ error: "Coordenadas não fornecidas" });
  }
  const [latitude, longitude] = coordinates.split(",");
  try {
    const weatherData = await getWeather(latitude, longitude);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o clima" });
  }
});

// Rota para retornar a lista de capitais brasileiras
app.get("/capitais", (req, res) => {
  res.json(capitaisBrasileiras);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
