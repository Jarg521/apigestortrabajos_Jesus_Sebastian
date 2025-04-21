const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const authMiddleware = require('../middleware/authMiddleware');

// Todas las rutas están protegidas con JWT
router.post('/', authMiddleware, tareaController.crearTarea);
router.get('/', authMiddleware, tareaController.obtenerTareas);
router.get('/:id', authMiddleware, tareaController.obtenerTareaPorId);
router.put('/:id', authMiddleware, tareaController.actualizarTarea);
router.delete('/:id', authMiddleware, tareaController.eliminarTarea);

module.exports = router;
