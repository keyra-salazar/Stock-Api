const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

// GET /api/productos: Público para el dashboard
router.get('/', authController.obtenerProductos);

// POST /api/productos: PROTEGIDO 
router.post('/', auth, authController.crearProducto);

// PATCH /api/productos/:id: PROTEGIDO 
router.patch('/:id', auth, authController.actualizarStock);

module.exports = router;