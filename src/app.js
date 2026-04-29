const express = require("express");
const cors = require("cors");
require("./database/db");

const app = express();

app.use(cors());
app.use(express.json());

const turnosRoutes = require("./routes/turnos.routes");
app.use("/turnos", turnosRoutes);

app.get("/", (req, res) => {
  res.json({
    mensaje: "API de Turnos Médicos funcionando correctamente",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});