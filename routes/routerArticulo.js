const express = require('express');
const router = express.Router();

const controllerArticulo = require('../controllers/controllerArticulo');
router.get('/listar', controllerArticulo);
router.get('/buscar/:id', controllerArticulo);
router.post('/crear', controllerArticulo);
router.post('/editar/:id', controllerArticulo);
router.delete('/borrar/:id', controllerArticulo);

// Configuración de la ruta para realizar consultas
const controladorArticuloCarrito = require('../controllers/controllerArticuloCarrito');
router.get('/articulocarrito', controladorArticuloCarrito);
router.get('/articulocarrito/:id', controladorArticuloCarrito);
router.delete(
	'/articulocarrito/:idCarritoCompra/:idProducto',
	controladorArticuloCarrito
);
const controladorArticuloProducto = require('../controllers/controllerArticuloProducto');
router.get('/articuloproducto', controladorArticuloProducto);

module.exports = router;
