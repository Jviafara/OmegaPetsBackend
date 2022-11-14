//Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Autentica un usuario
// api/auth

const authController = require('../controllers/controller_auth');
router.post('/autentificar', authController);
router.get('/autentificado', auth, authController);

module.exports = router;
