const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const tareaRoutes = require('./routes/tareaRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Rutas
app.use('/api/tareas', tareaRoutes);
app.use('/api/auth', authRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error('Error de conexión:', err));

module.exports = app;
