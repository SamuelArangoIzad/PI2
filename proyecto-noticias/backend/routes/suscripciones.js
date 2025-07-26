const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('frontend'));

// Ruta al archivo JSON
const suscripcionesPath = path.join(__dirname, '../../database/json/suscripciones.json');

// Endpoint para guardar email
app.post('/api/suscribirse', (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Correo inválido' });
    }

    // Leer archivo actual
    let suscripciones = [];
    if (fs.existsSync(suscripcionesPath)) {
        suscripciones = JSON.parse(fs.readFileSync(suscripcionesPath, 'utf8'));
    }

    // Agregar nueva suscripción
    suscripciones.push({ email, fecha: new Date().toISOString() });

    // Guardar en archivo JSON
    fs.writeFileSync(suscripcionesPath, JSON.stringify(suscripciones, null, 2));

    return res.json({ message: '¡Suscripción guardada con éxito!', suscripciones });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
