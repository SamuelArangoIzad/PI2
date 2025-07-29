const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const router = express.Router();

// Ruta al archivo JSON
const usuariosPath = path.join(__dirname, '../../database/json/usuarios.json');

// Middleware para parsear JSON
router.use(express.json());

// **Endpoint para registrar usuario**
router.post('/api/registrar', async (req, res) => {
    const { usuario, email, nombre, apellido, telefono, contrasena, confirmarContrasena } = req.body;

    // Validaciones básicas
    if (!usuario || !email || !nombre || !apellido || !telefono || !contrasena || !confirmarContrasena) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    if (contrasena !== confirmarContrasena) {
        return res.status(400).json({ error: 'Las contraseñas no coinciden.' });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ error: 'Correo electrónico no válido.' });
    }

    // Leer archivo actual
    let usuarios = [];
    if (fs.existsSync(usuariosPath)) {
        usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));
    }

    // Verificar si el usuario ya existe
    const existeUsuario = usuarios.find(u => u.usuario === usuario || u.email === email);
    if (existeUsuario) {
        return res.status(400).json({ error: 'El usuario o correo ya está registrado.' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear objeto usuario
    const nuevoUsuario = {
        usuario,
        email,
        nombre,
        apellido,
        telefono,
        contrasena: hashedPassword
    };

    // Guardar usuario en el JSON
    usuarios.push(nuevoUsuario);
    fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));

    return res.json({ message: '¡Usuario registrado con éxito!', usuario: nuevoUsuario.usuario });
});

module.exports = router;
