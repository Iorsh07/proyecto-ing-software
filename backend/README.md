# Backend en Node.js + Express con Autenticación JWT

API REST desarrollada en **Node.js**, **Express** y **MongoDB (Mongoose)** que registra usuarios, inicia sesión generando un token JWT y ofrece un CRUD de tareas protegido con **Bearer Token**, en el que cada usuario solo puede ver, modificar y eliminar sus propias tareas.

## Cómo instalarlo y ejecutarlo

1. Clonar el repositorio e instalar las dependencias:
   ```bash
   git clone https://github.com/<tu-usuario>/<tu-repositorio>.git
   cd <tu-repositorio>
   npm install
   ```

2. Crear un archivo `.env` en la raíz del proyecto tomando como base `.env.example` y configurar tus variables (`PORT`, `MONGO_URI` y `JWT_SECRET`):
   ```bash
   cp .env.example .env
   ```

3. Ejecutar el servidor:
   - En modo desarrollo (con `nodemon`):
     ```bash
     npm run server
     ```
   - En modo normal:
     ```bash
     npm start
     ```

## Lista de Endpoints

| Método | Ruta | Descripción | ¿Requiere token? |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/users` | Crear usuario (`crearUser`) | No |
| `POST` | `/api/users/login` | Iniciar sesión y devolver el JWT (`loginUser`) | No |
| `GET` | `/api/users/datos` | Datos del usuario dueño del token (`datosUser`) | Sí |
| `GET` | `/api/tareas` | Listar solo las tareas del usuario logueado (`getTareas`) | Sí |
| `POST` | `/api/tareas` | Crear una tarea asignada al usuario logueado (`createTareas`) | Sí |
| `PUT` | `/api/tareas/:id` | Modificar una tarea propia (`updateTareas`) | Sí |
| `DELETE` | `/api/tareas/:id` | Eliminar una tarea propia (`deleteTareas`) | Sí |
