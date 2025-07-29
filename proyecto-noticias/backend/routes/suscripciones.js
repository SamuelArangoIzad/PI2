const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Ruta JSON
const suscripcionesPath = path.join(__dirname, '../../database/json/suscripciones.json');

// Middleware
router.use(express.json());

// Endpoint
router.post('/api/suscribirse', (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Correo inválido' });
    }

    let suscripciones = [];
    if (fs.existsSync(suscripcionesPath)) {
        suscripciones = JSON.parse(fs.readFileSync(suscripcionesPath, 'utf8'));
    }

    suscripciones.push({ email, fecha: new Date().toISOString() });

    fs.writeFileSync(suscripcionesPath, JSON.stringify(suscripciones, null, 2));

    return res.json({ message: '¡Suscripción guardada con éxito!' });
});

module.exports = router;
