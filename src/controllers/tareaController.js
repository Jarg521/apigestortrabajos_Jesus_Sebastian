const Tarea = require('../models/tarea');

// Crear una nueva tarea
exports.crearTarea = async (req, res) => {
    try {
        const nuevaTarea = new Tarea(req.body);
        const tareaGuardada = await nuevaTarea.save();
        res.status(201).json(tareaGuardada);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la tarea', error });
    }
};

// Obtener todas las tareas
exports.obtenerTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find();
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las tareas', error });
    }
};

// Obtener una tarea por ID
exports.obtenerTareaPorId = async (req, res) => {
    try {
        const tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }
        res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la tarea', error });
    }
};

// Actualizar una tarea
exports.actualizarTarea = async (req, res) => {
    try {
        const tareaActualizada = await Tarea.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!tareaActualizada) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }
        res.status(200).json(tareaActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la tarea', error });
    }
};

// Eliminar una tarea
exports.eliminarTarea = async (req, res) => {
    try {
        const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id);
        if (!tareaEliminada) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }
        res.status(200).json({ mensaje: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la tarea', error });
    }
};
