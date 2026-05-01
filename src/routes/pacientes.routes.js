const express = require("express");
const router = express.Router();

const {
  obtenerPacientes,
  crearPaciente,
  eliminarPaciente,
} = require("../controllers/pacientes.controller");

router.get("/", obtenerPacientes);
router.post("/", crearPaciente);
router.delete("/:id", eliminarPaciente);

module.exports = router;