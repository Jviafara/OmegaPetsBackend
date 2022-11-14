const express = require('express');
const router = express.Router();


const controllerRol = require('../controllers/controllerRol');
router.get("/listar", controllerRol);
router.get("/buscar/:id", controllerRol);
router.post("/crear", controllerRol);
router.post("/editar/:id", controllerRol);
router.delete("/borrar/:id", controllerRol);


module.exports = router;