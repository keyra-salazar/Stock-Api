const Libro = require('../model/libro');

// Crear un libro
exports.crearLibro = async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.status(201).json(nuevoLibro);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

// Obtener por ID 
exports.obtenerPorId = async (req, res) => {
    const libro = await Libro.findById(req.params.id);
    res.json(libro);
};

// Listar todos 
exports.listarTodos = async (req, res) => {
    const libros = await Libro.find();
    res.json(libros);
};

// Actualizar 
exports.actualizar = async (req, res) => {
    const actualizado = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
};

// Eliminar 
exports.eliminar = async (req, res) => {
    await Libro.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Libro eliminado" });
};