/* Desestructuración del objeto Router del módulo express. */
const { Router } = require('express');
const router = Router();

const controllerProducto = require('./routerProducto');
const controllerUsuario = require('./routerUsuario');
const controllerArticulo = require('./routerArticulo');
const controllerRol = require('./routerRol');
const controllerCarritoCompra = require('./routerCarritoCompra');
const controllerFacturas = require('./routerFacturas');
const controllerAuth = require('./router_auth');

router.use('/producto', controllerProducto);
router.use('/usuario', controllerUsuario);
router.use('/articulo', controllerArticulo);
router.use('/rol', controllerRol);
router.use('/carrito', controllerCarritoCompra);
router.use('/factura', controllerFacturas);
router.use('/login', controllerAuth);

module.exports = router;
