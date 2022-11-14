const express = require('express');
const router = express.Router();

const controllerProducto = require('../controllers/controllerProducto');
router.get('/listar', controllerProducto);
router.get('/buscar/:id', controllerProducto);
router.post('/crear', controllerProducto);
router.put('/editar/:id', controllerProducto);
router.delete('/borrar/:id', controllerProducto);

module.exports = router;
