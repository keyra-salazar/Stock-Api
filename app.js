const express = require('express');
const mongoose = require('mongoose');
const libroCtrl = require('./controller/LibroController');

const app = express();
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/Biblioteca_db')
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.error("Error de conexión", err));

// Rutas solicitadas
app.post('/Libros', libroCtrl.crearLibro);
app.get('/Libros/:id', libroCtrl.obtenerPorId);
app.get('/Listado', libroCtrl.listarTodos);
app.put('/modifica/:id', libroCtrl.actualizar);
app.delete('/elimina/:id', libroCtrl.eliminar);

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));