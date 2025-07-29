// Servidor Node.js

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('frontend'));

// Importar rutas
const registroRoute = require('./routes/registro');
const suscripcionesRoute = require('./routes/suscripciones');
const loginRoutes = require('./routes/entrada');

// Usar rutas
app.use(registroRoute);
app.use(suscripcionesRoute);
app.use(loginRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

