const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const controllerUsuarioAuth = require('../controllers/ControllerUsuario');
//const controllerUserAuth = require('../controllers/controllerUser');
router.get('/listar', auth, controllerUsuarioAuth);
router.get('/buscar/:id', auth, controllerUsuarioAuth);
router.get('/buscaremail/:email', auth, controllerUsuarioAuth);
router.post('/crear', auth, controllerUsuarioAuth);
router.post('/crearauth', controllerUsuarioAuth);
// router.post(
// 	'/crearauth',
// 	[
// 		check('nombres', 'El nombre es obligatorio').not().isEmpty(),
// 		check('email', 'Agrega un email válido').isEmail(),
// 		check(
// 			'password',
// 			'El password debe ser mínimo de 6 caracteres'
// 		).isLength({
// 			min: 6,
// 		}),
// 	],
// 	controllerUserAuth.crearUsuario
// );
router.post('/editar/:id', auth, controllerUsuarioAuth);
router.delete('/borrar/:id', auth, controllerUsuarioAuth);

const controllerUsuario = require('../controllers/controllerUsuario');
router.get('/listarSinAuth', controllerUsuario);
router.get('/buscarSinAuth/:id', controllerUsuario);
router.get('/buscaremailSinAuth/:email', controllerUsuario);
router.post('/crearSinAuth', controllerUsuario);
router.post('/editarSinAuth/:id', controllerUsuario);
router.delete('/borrarSinAuth/:id', controllerUsuario);

//CONFIGURACIÓN DE LAS RUTAS PARA REALIZAR CONSULTAS
const controlllerUsuariosRoles = require('../controllers/controllerUsuariosRoles');
router.get('/usuariosroles', controlllerUsuariosRoles);
router.get('/usuariosroles/:id?', controlllerUsuariosRoles);

module.exports = router;
