const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

const generarToken = (usuario) => {
    return jwt.sign({ id: usuario._id, nombre: usuario.nombre }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

// Registro
exports.registrar = async (req, res) => {
    try {
        const { nombre, correo, contraseña } = req.body;

        const usuarioExistente = await Usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
        }

        const nuevoUsuario = new Usuario({ nombre, correo, contraseña });
        await nuevoUsuario.save();

        const token = generarToken(nuevoUsuario);
        res.status(201).json({ token, usuario: { id: nuevoUsuario._id, nombre } });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar usuario', error });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Usuario no encontrado.' });
        }

        const esValido = await usuario.compararContraseña(contraseña);
        if (!esValido) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
        }

        const token = generarToken(usuario);
        res.status(200).json({ token, usuario: { id: usuario._id, nombre: usuario.nombre } });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
    }
};
