const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Middlewares para parsear JSON y formularios urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Montaje de rutas de la API
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/tareas', require('./routes/tareasRoutes'));

// Middleware centralizado de manejo de errores
app.use(errorHandler);

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`.yellow.bold));
