const asyncHandler = require('express-async-handler');
const Tarea = require('../models/tareasModel');

// @desc    Listar únicamente las tareas del usuario autenticado
// @route   GET /api/tareas
// @access  Private
const getTareas = asyncHandler(async (req, res) => {
    // Filtra estrictamente por el id obtenido del token (req.user.id)
    const tareas = await Tarea.find({ user: req.user.id });
    res.status(200).json(tareas);
});

// @desc    Crear una tarea asignada al usuario autenticado
// @route   POST /api/tareas
// @access  Private
const createTareas = asyncHandler(async (req, res) => {
    if (!req.body.descripcion) {
        res.status(400);
        throw new Error('Por favor teclea una descripción para la tarea');
    }

    // El dueño de la tarea se asigna desde req.user.id (extraído del JWT), nunca del body
    const tarea = await Tarea.create({
        descripcion: req.body.descripcion,
        completada: req.body.completada || false,
        user: req.user.id
    });

    res.status(201).json(tarea);
});

// @desc    Modificar una tarea propia
// @route   PUT /api/tareas/:id
// @access  Private
const updateTareas = asyncHandler(async (req, res) => {
    const tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
        res.status(404);
        throw new Error('La tarea solicitada no existe');
    }

    // Verificar que la tarea pertenezca al usuario del token
    if (tarea.user.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Acceso prohibido: no puedes modificar una tarea que pertenece a otro usuario');
    }

    const tareaUpdated = await Tarea.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(tareaUpdated);
});

// @desc    Eliminar una tarea propia
// @route   DELETE /api/tareas/:id
// @access  Private
const deleteTareas = asyncHandler(async (req, res) => {
    const tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
        res.status(404);
        throw new Error('La tarea solicitada no existe');
    }

    // Verificar que la tarea pertenezca al usuario del token
    if (tarea.user.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Acceso prohibido: no puedes eliminar una tarea que pertenece a otro usuario');
    }

    await tarea.deleteOne();

    res.status(200).json({
        id: req.params.id,
        mensaje: 'Tarea eliminada correctamente'
    });
});

module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
};
