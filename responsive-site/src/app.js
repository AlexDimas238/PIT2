const express = require("express");
const path = require("path");
const getWeather = require("./weather"); // Importando o módulo para buscar o clima

const app = express();
const PORT = 3000;

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, "../public")));

// Rota para obter o clima com base na cidade
app.get("/weather", async (req, res) => {
  const city = req.query.city || "São Paulo"; // Cidade padrão é São Paulo
  try {
    const weatherData = await getWeather(city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Falha ao buscar o clima" });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
