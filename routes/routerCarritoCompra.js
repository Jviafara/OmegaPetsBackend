const express = require('express');
const router = express.Router();


const controllerCarritoCompra = require('../controllers/controllerCarritoCompra');
router.get("/listar", controllerCarritoCompra);
router.get("/buscar/:id", controllerCarritoCompra);
router.post("/crear", controllerCarritoCompra);
router.put("/editar/:id", controllerCarritoCompra);
router.delete("/borrar/:id", controllerCarritoCompra);

router.get('/carritoPorEstado/:estado/:idUsuario', controllerCarritoCompra);

module.exports = router;