const db = require("../database/db");

const obtenerPacientes = (req, res) => {
  db.all("SELECT * FROM pacientes", [], (error, rows) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al obtener pacientes" });
    }

    res.json(rows);
  });
};

const crearPaciente = (req, res) => {
  const { nombre, dni, email, telefono } = req.body || {};

  if (!nombre || !dni || !email || !telefono) {
    return res.status(400).json({
      mensaje: "Todos los campos son obligatorios",
    });
  }

  const sql = `
    INSERT INTO pacientes (nombre, dni, email, telefono)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [nombre, dni, email, telefono], function (error) {
    if (error) {
      return res.status(500).json({ mensaje: "Error al crear paciente" });
    }

    res.status(201).json({
      mensaje: "Paciente creado correctamente",
      paciente: {
        id: this.lastID,
        nombre,
        dni,
        email,
        telefono,
      },
    });
  });
};

const eliminarPaciente = (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM pacientes WHERE id = ?", [id], function (error) {
    if (error) {
      return res.status(500).json({ mensaje: "Error al eliminar paciente" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ mensaje: "Paciente no encontrado" });
    }

    res.json({ mensaje: "Paciente eliminado correctamente" });
  });
};

module.exports = {
  obtenerPacientes,
  crearPaciente,
  eliminarPaciente,
};