const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const router = express.Router();
const usuariosPath = path.join(__dirname, '../../database/json/usuarios.json');

router.use(express.json());

// Endpoint para inicio de sesión
router.post('/api/login', async (req, res) => {
    const { usuario, contrasena } = req.body;


    if (!usuario || !contrasena) {
        return res.status(400).json({ error: 'Usuario y contraseña son obligatorios.' });
    }


    // Leer usuarios
    let usuarios = [];
    if (fs.existsSync(usuariosPath)) {
        usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));
    }


    // Buscar usuario
    const user = usuarios.find(u => u.usuario.toLowerCase() === usuario.toLowerCase());
    if (!user) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
    }


    // Verificar contraseña
    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (!match) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
    }


    // Login correcto
    return res.json({ 
        message: '¡Inicio de sesión exitoso!', 
        usuario: user.usuario,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: user.telefono
    });
    
});


module.exports = router;
