const db = require("../database/db");

// GET todos los turnos con JOIN
const obtenerTurnos = (req, res) => {
  const sql = `
    SELECT 
      t.id,
      p.nombre AS paciente,
      m.nombre AS medico,
      m.especialidad,
      t.fecha,
      t.hora,
      t.estado
    FROM turnos t
    JOIN pacientes p ON t.paciente_id = p.id
    JOIN medicos m ON t.medico_id = m.id
  `;

  db.all(sql, [], (error, rows) => {
    if (error) {
      return res.status(500).json({
        mensaje: "Error al obtener turnos",
        error: error.message,
      });
    }

    res.json(rows);
  });
};

// GET por ID
const obtenerTurnoPorId = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      t.id,
      p.nombre AS paciente,
      m.nombre AS medico,
      m.especialidad,
      t.fecha,
      t.hora,
      t.estado
    FROM turnos t
    JOIN pacientes p ON t.paciente_id = p.id
    JOIN medicos m ON t.medico_id = m.id
    WHERE t.id = ?
  `;

  db.get(sql, [id], (error, row) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al obtener turno" });
    }

    if (!row) {
      return res.status(404).json({ mensaje: "Turno no encontrado" });
    }

    res.json(row);
  });
};

// POST
const crearTurno = (req, res) => {
  const { paciente_id, medico_id, fecha, hora } = req.body || {};

  if (!paciente_id || !medico_id || !fecha || !hora) {
    return res.status(400).json({
      mensaje: "Todos los campos son obligatorios",
    });
  }

  const sql = `
    INSERT INTO turnos (paciente_id, medico_id, fecha, hora)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [paciente_id, medico_id, fecha, hora], function (error) {
    if (error) {
      return res.status(500).json({
        mensaje: "Error al crear turno",
        error: error.message,
      });
    }

    res.status(201).json({
      mensaje: "Turno creado correctamente",
      id: this.lastID,
    });
  });
};

// PUT
const actualizarTurno = (req, res) => {
  const { id } = req.params;
  const { paciente_id, medico_id, fecha, hora, estado } = req.body || {};

  const sql = `
    UPDATE turnos
    SET paciente_id = ?, medico_id = ?, fecha = ?, hora = ?, estado = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [paciente_id, medico_id, fecha, hora, estado, id],
    function (error) {
      if (error) {
        return res.status(500).json({
          mensaje: "Error al actualizar turno",
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
};

// DELETE
const eliminarTurno = (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM turnos WHERE id = ?", [id], function (error) {
    if (error) {
      return res.status(500).json({
        mensaje: "Error al eliminar turno",
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
};

module.exports = {
  obtenerTurnos,
  obtenerTurnoPorId,
  crearTurno,
  actualizarTurno,
  eliminarTurno,
};