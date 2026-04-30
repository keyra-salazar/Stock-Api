const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ mensaje: "Acceso denegado. No hay token." });
    }

    try {
        const verificado = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'secreto_para_desarrollo');
        req.user = verificado;
        next(); 
    } catch (error) {
        res.status(400).json({ mensaje: "Token no válido" });
    }
};