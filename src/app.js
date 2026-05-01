const express = require("express");
const cors = require("cors");
require("./database/db");

const app = express();

app.use(cors());
app.use(express.json());

const turnosRoutes = require("./routes/turnos.routes");
const medicosRoutes = require("./routes/medicos.routes");
const pacientesRoutes = require("./routes/pacientes.routes");

app.use("/turnos", turnosRoutes);
app.use("/medicos", medicosRoutes);
app.use("/pacientes", pacientesRoutes);

app.get("/", (req, res) => {
  res.json({
    mensaje: "API de Turnos Médicos funcionando correctamente",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});