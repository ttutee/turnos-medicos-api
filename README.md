# 🏥 API de Turnos Médicos

API REST desarrollada con Node.js, Express y SQLite para la gestión de turnos médicos, pacientes y profesionales.

## 🚀 Tecnologías

* Node.js
* Express
* SQLite
* Arquitectura MVC (routes + controllers)

## 📌 Funcionalidades

* Gestión de pacientes
* Gestión de médicos
* Gestión de turnos
* Relaciones entre entidades (paciente ↔ turno ↔ médico)
* Consultas con JOIN

## 📡 Endpoints

### 🧑 Pacientes

* GET /pacientes
* POST /pacientes
* DELETE /pacientes/:id

### 👨‍⚕️ Médicos

* GET /medicos
* POST /medicos
* DELETE /medicos/:id

### 📅 Turnos

* GET /turnos
* GET /turnos/:id
* POST /turnos
* PUT /turnos/:id
* DELETE /turnos/:id

## 🧠 Ejemplo de creación de turno

```json
{
  "paciente_id": 1,
  "medico_id": 1,
  "fecha": "2026-05-01",
  "hora": "10:00"
}
```

## ▶️ Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

## 💡 Autor

Proyecto desarrollado por Tomás como parte de su portfolio backend.
