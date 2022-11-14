const express = require('express');
const router = express.Router();

const controllerFactura = require('../controllers/controllerFacturas');
router.get('/listar', controllerFactura);
router.get('/buscar/:id', controllerFactura);
router.post('/crear', controllerFactura);
router.post('/editar/:id', controllerFactura);
router.delete('/borrar/:id', controllerFactura);

// Configuración de la ruta para realizar consultas
const controladorFacturaCarrito = require('../controllers/controllerFacturaCarrito');
router.get('/facturacarrito', controladorFacturaCarrito);

// Configuración de la ruta para realizar consultas factura usuario carrito
const controladorFacturaUsuarioCarrito = require('../controllers/controllerFacturaUsuarioCarrito');
router.get('/facturausuariocarrito', controladorFacturaUsuarioCarrito); 
router.get('/facturausuariocarrito/:id', controladorFacturaUsuarioCarrito); 



//CONSULTA FACTURAS-USUARIOS
const controllerFacturaUsuario = require('../controllers/controllerFacturaUsuario');
router.get('/facturausuario', controllerFacturaUsuario);
router.get('/facturausuario/:id', controllerFacturaUsuario);

//CONSULTA FACTURAS-USUARIOS-CARRITO
/* const controladorFacturaUsuarioCarrito = require('../controllers/controllerFacturaUsuarioCarrito');
router.get('/facturausuario', controladorFacturaUsuarioCarrito);
router.get('/facturausuario/:id', controladorFacturaUsuarioCarrito);
router.get('/facturausuariocarrito', controladorFacturaUsuarioCarrito); */



module.exports = router;
