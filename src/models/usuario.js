const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
});

// Encriptar contraseña antes de guardar
usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('contraseña')) return next();
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
});

// Método para comparar contraseñas
usuarioSchema.methods.compararContraseña = function (input) {
    return bcrypt.compare(input, this.contraseña);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
