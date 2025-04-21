const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Verificamos que haya token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verificamos el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded; // puedes acceder luego con req.usuario.id, etc.
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token inválido o expirado.' });
    }
};

module.exports = authMiddleware;
