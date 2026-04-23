const mongoose = require('mongoose');

const LibroSchema = new mongoose.Schema({
    _id: { type: Number, required: true }, 
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    publicacion: { type: Number, required: true },
    precio: { type: Number, required: true }
});

module.exports = mongoose.model('Libro', LibroSchema);