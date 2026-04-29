const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET - Obtener todos los turnos
router.get("/", (req, res) => {
  const sql = "SELECT * FROM turnos";

  db.all(sql, [], (error, rows) => {
    if (error) {
      return res.status(500).json({
        mensaje: "Error al obtener los turnos",
        error: error.message,
      });
    }

    res.json(rows);
  });
});

// GET - Obtener un turno por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM turnos WHERE id = ?";

  db.get(sql, [id], (error, row) => {
    if (error) {
      return res.status(500).json({
        mensaje: "Error al obtener el turno",
        error: error.message,
      });
    }

    if (!row) {
      return res.status(404).json({
        mensaje: "Turno no encontrado",
      });
    }

    res.json(row);
  });
});

// POST - Crear un turno
router.post("/", (req, res) => {
  const { paciente, medico, especialidad, fecha, hora } = req.body || {};

  if (!paciente || !medico || !especialidad || !fecha || !hora) {
    return res.status(400).json({
      mensaje: "Todos los campos son obligatorios",
    });
  }

  const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!fechaRegex.test(fecha)) {
    return res.status(400).json({
      mensaje: "Formato de fecha inválido. Usar YYYY-MM-DD",
    });
  }

  const sql = `
    INSERT INTO turnos (paciente, medico, especialidad, fecha, hora)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [paciente, medico, especialidad, fecha, hora], function (error) {
    if (error) {
      return res.status(500).json({
        mensaje: "Error al crear el turno",
        error: error.message,
      });
    }

    res.status(201).json({
      mensaje: "Turno creado correctamente",
      turno: {
        id: this.lastID,
        paciente,
        medico,
        especialidad,
        fecha,
        hora,
        estado: "pendiente",
      },
    });
  });
});

// PUT - Actualizar un turno
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { paciente, medico, especialidad, fecha, hora, estado } = req.body || {};

  if (!paciente || !medico || !especialidad || !fecha || !hora || !estado) {
    return res.status(400).json({
      mensaje: "Todos los campos son obligatorios",
    });
  }

  const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!fechaRegex.test(fecha)) {
    return res.status(400).json({
      mensaje: "Formato de fecha inválido. Usar YYYY-MM-DD",
    });
  }

  const sql = `
    UPDATE turnos
    SET paciente = ?, medico = ?, especialidad = ?, fecha = ?, hora = ?, estado = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [paciente, medico, especialidad, fecha, hora, estado, id],
    function (error) {
      if (error) {
        return res.status(500).json({
          mensaje: "Error al actualizar el turno",
          error: error.message,
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          mensaje: "Turno no encontrado",
        });
      }

      res.json({
        mensaje: "Turno actualizado correctamente",
      });
    }
  );
});

// DELETE - Eliminar un turno
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM turnos WHERE id = ?";

  db.run(sql, [id], function (error) {
    if (error) {
      return res.status(500).json({
        mensaje: "Error al eliminar el turno",
        error: error.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        mensaje: "Turno no encontrado",
      });
    }

    res.json({
      mensaje: "Turno eliminado correctamente",
    });
  });
});

module.exports = router;