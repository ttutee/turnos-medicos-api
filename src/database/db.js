const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite", (error) => {
  if (error) {
    console.error("Error al conectar con la base de datos:", error.message);
  } else {
    console.log("Base de datos conectada correctamente");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS turnos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      paciente TEXT NOT NULL,
      medico TEXT NOT NULL,
      especialidad TEXT NOT NULL,
      fecha TEXT NOT NULL,
      hora TEXT NOT NULL,
      estado TEXT DEFAULT 'pendiente'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS medicos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      especialidad TEXT NOT NULL,
      email TEXT NOT NULL,
      telefono TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS pacientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      dni TEXT NOT NULL,
      email TEXT NOT NULL,
      telefono TEXT NOT NULL
    )
  `);
});

module.exports = db;