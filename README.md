    🏥 API de Turnos Médicos

API REST desarrollada con Node.js y Express para la gestión de turnos médicos.

## 🚀 Tecnologías

* Node.js
* Express
* SQLite

## 📌 Funcionalidades

* Crear turnos
* Listar turnos
* Obtener turno por ID
* Actualizar turnos
* Eliminar turnos

## 📡 Endpoints

### Crear turno

POST /turnos

### Obtener todos

GET /turnos

### Obtener por ID

GET /turnos/:id

### Actualizar

PUT /turnos/:id

### Eliminar

DELETE /turnos/:id

## ▶️ Cómo correr el proyecto

```bash
npm install
npm run dev
```

## 📷 Ejemplo de uso

```json
{
  "paciente": "Juan Perez",
  "medico": "Dr. Gomez",
  "especialidad": "Cardiologia",
  "fecha": "2026-04-26",
  "hora": "12:00"
}
```

## 👨‍💻 Autor

Proyecto desarrollado por Tomás para portfolio backend.
