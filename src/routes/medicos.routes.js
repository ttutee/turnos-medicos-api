const express = require("express");
const router = express.Router();

const {
  obtenerMedicos,
  crearMedico,
  eliminarMedico,
} = require("../controllers/medicos.controller");

router.get("/", obtenerMedicos);
router.post("/", crearMedico);
router.delete("/:id", eliminarMedico);

module.exports = router;