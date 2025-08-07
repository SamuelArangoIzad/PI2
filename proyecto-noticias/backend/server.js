/**
 * Node.js Server for News Project
 *
 * This server uses Express to serve static frontend files and handle API routes for user registration, subscriptions, and login.
 *
 * Main Features:
 * - Serves static files from the frontend directory
 * - Handles API routes for registration, subscriptions, and login
 * - Serves the main index.html on root path
 *
 * Author: [Your Name]
 * Date: August 7, 2025
 */

const express = require('express'); // Express framework for building web applications
const path = require('path');       // Node.js module for handling file paths

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Import route handlers
const registroRoute = require('./routes/registro');      // User registration routes
const suscripcionesRoute = require('./routes/suscripciones'); // Subscription routes
const loginRoutes = require('./routes/entrada');         // Login routes

// Use imported routes
app.use(registroRoute);
app.use(suscripcionesRoute);
app.use(loginRoutes);


// Serve the main frontend page on root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
