const express = require("express");
const router = express.Router();

const {
  obtenerTurnos,
  obtenerTurnoPorId,
  crearTurno,
  actualizarTurno,
  eliminarTurno,
} = require("../controllers/turnos.controller");

router.get("/", obtenerTurnos);
router.get("/:id", obtenerTurnoPorId);
router.post("/", crearTurno);
router.put("/:id", actualizarTurno);
router.delete("/:id", eliminarTurno);

module.exports = router;