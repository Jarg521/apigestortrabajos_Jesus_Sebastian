const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String },
    responsable: { type: String, required: true }, // nombre del responsable
    prioridad: { type: String, enum: ['baja', 'media', 'alta'], default: 'media' },
    estado: { type: String, enum: ['pendiente', 'en progreso', 'completada'], default: 'pendiente' },
    fechaCreacion: { type: Date, default: Date.now },
    fechaEntrega: { type: Date },
    etiquetas: [{ type: String }], // ej: ["urgente", "cliente", "interno"]
    comentarios: [{
        autor: String,
        mensaje: String,
        fecha: { type: Date, default: Date.now }
    }],
    archivoAdjunto: { type: String } // nombre del archivo o URL
});

module.exports = mongoose.model('Tarea', tareaSchema);
