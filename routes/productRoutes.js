const express = require('express');
const router = express.Router();
const Products = require('../models/Products');
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

// GET /api/productos: Público para el dashboard
router.get('/', authController.obtenerProductos);

// POST /api/productos: PROTEGIDO 
router.post('/', auth, authController.crearProducto ); 

// PATCH /api/productos/:id: PROTEGIDO 
router.patch('/:id', auth, authController.actualizarStock);

// DELETE /api/productos -> Vaciar la base de datos de prueba
router.delete('/', async (req, res) => {
    try {
        await Products.deleteMany({}); 
        res.json({ mensaje: "Todos los productos de prueba han sido eliminados con éxito" });
    } catch (error) {
        console.error("Error al borrar:", error);
        res.status(500).json({ mensaje: "Error al limpiar la base de datos", detalle: error.message });
    }
});

module.exports = router;