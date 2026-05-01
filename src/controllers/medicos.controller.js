const db = require("../database/db");

const obtenerMedicos = (req, res) => {
  db.all("SELECT * FROM medicos", [], (error, rows) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al obtener médicos" });
    }

    res.json(rows);
  });
};

const crearMedico = (req, res) => {
  const { nombre, especialidad, email, telefono } = req.body || {};

  if (!nombre || !especialidad || !email || !telefono) {
    return res.status(400).json({
      mensaje: "Todos los campos son obligatorios",
    });
  }

  const sql = `
    INSERT INTO medicos (nombre, especialidad, email, telefono)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [nombre, especialidad, email, telefono], function (error) {
    if (error) {
      return res.status(500).json({ mensaje: "Error al crear médico" });
    }

    res.status(201).json({
      mensaje: "Médico creado correctamente",
      medico: {
        id: this.lastID,
        nombre,
        especialidad,
        email,
        telefono,
      },
    });
  });
};

const eliminarMedico = (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM medicos WHERE id = ?", [id], function (error) {
    if (error) {
      return res.status(500).json({ mensaje: "Error al eliminar médico" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ mensaje: "Médico no encontrado" });
    }

    res.json({ mensaje: "Médico eliminado correctamente" });
  });
};

module.exports = {
  obtenerMedicos,
  crearMedico,
  eliminarMedico,
};