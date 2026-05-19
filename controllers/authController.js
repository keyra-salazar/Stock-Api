const Products = require('../models/Products');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// GET /productos: Lee todos los documentos (Read)
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Products.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener productos" });
    }
};

// POST /productos: Crea un nuevo producto (Create)
exports.crearProducto = async (req, res) => {
    try {
        const nuevoProducto = new Products(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear el producto" });
    }
};

// PATCH /productos/:id: Actualiza el stock manualmente (Update)
exports.actualizarStock = async (req, res) => {
    try {
        const { cantidad } = req.body;
        const producto = await Products.findByIdAndUpdate(
            req.params.id, 
            { cantidad, estadoAlerta: false }, 
            { new: true }
        );
        res.json(producto);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar stock" });
    }
};

// Registro de usuario
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const nuevoUsuario = new User({ username, password });
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: "Usuario registrado con éxito" });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al registrar usuario", error });
    }
};

// Login y generación de Token
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const usuario = await User.findOne({ username });
        if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

        const esValido = await bcrypt.compare(password, usuario.password);
        if (!esValido) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

        // Generación del JWT usando el secreto de tu .env [cite: 38, 42]
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET || 'secreto_provisional', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};