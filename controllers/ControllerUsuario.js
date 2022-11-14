const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

//Aqui van todos los métodos para operar en la BD
router.post('/crear', (req, res) => {
	Usuario.find({ email: req.body.email }, function (err, result) {
		if (result) {
			const usuario = result[0];
			if (usuario) {
				//console.log(usuario.email);
				return res.status(200).send({ msg: 'El Usuario ya existe' });
			}
		}
		const password = req.body.password;
		if (password.length < 6) {
			//console.log(password);
			return res.status(200).send({
				msg: 'La contraseña debe contener al menos 6 caracteres',
			});
		}
		var myUsuario = new Usuario(req.body);
		myUsuario.save((err, result) => {
			res.status(200).send({ message: result });
		});
	});
});

router.post('/crearSinAuth', (req, res) => {
	Usuario.find({ email: req.body.email }, function (err, result) {
		if (result) {
			const usuario = result[0];
			if (usuario) {
				//console.log(usuario.email);
				return res.status(200).send({ msg: 'El Usuario ya existe' });
			}
		}
		const password = req.body.password;
		if (password.length < 6) {
			//console.log(password);
			return res.status(200).send({
				msg: 'La contraseña debe contener al menos 6 caracteres',
			});
		}
		var myUsuario = new Usuario(req.body);
		myUsuario.save((err, result) => {
			res.status(200).send({ message: result });
			myUsuario.password = bcryptjs.hash(password, 10);
			//Firmar el JWT
			const payload = {
				usuario: { id: usuario.id },
			};
			jwt.sign(
				payload,
				process.env.SECRETA,
				{
					expiresIn: 3600, //1 hora
				},
				(error, token) => {
					if (error) throw error;

					//Mensaje de confirmación
					res.json({ token });
				}
			);
		});
	});
});

router.post('/crearauth', async (req, res) => {
	//revisar si hay errores
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({ errores: errores.array() });
	}

	const { email, password } = req.body;

	try {
		//Revisar que el usuario registrado sea único
		let usuario = await Usuario.findOne({ email });

		if (usuario) {
			return res.status(200).json({ msg: 'El usuario ya existe' });
		}

		//crear el nuevo usuario
		usuario = new Usuario(req.body);

		usuario.password = await bcryptjs.hash(password, 10);

		//Guardar usuario en la bd
		await usuario.save();

		//Firmar el JWT
		const payload = {
			usuario: { id: usuario.id },
		};

		jwt.sign(
			payload,
			process.env.SECRETA,
			{
				expiresIn: 43200, //12 hora
			},
			(error, token) => {
				if (error) throw error;

				//Mensaje de confirmación
				res.json({ token });
			}
		);
	} catch (error) {
		console.log('Hubo un error');
		console.log(error);
		res.status(400).send('Hubo un error');
	}
});

//Buscar por email
router.get('/buscar/:email', (req, res) => {
	var email = req.params.email;
	Usuario.find({ email: email }, function (err, result) {
		if (err) {
			res.status(500).send({
				message: 'Error al momento de ejecutar la solicitud',
			});
		} else {
			if (!result) {
				res.status(404).send({
					message: 'El registro a buscar no se encuentra disponible',
				});
			} else {
				res.status(200).send({ result });
			}
		}
	});
});

//Buscar por _id
router.get('/buscar/:id', (req, res) => {
	var _id = req.params.id;
	Usuario.find({ _id: _id }, function (err, result) {
		if (err) {
			res.status(500).send({
				message: 'Error al momento de ejecutar la solicitud',
			});
		} else {
			if (!result) {
				res.status(404).send({
					message: 'El registro a buscar no se encuentra disponible',
				});
			} else {
				res.status(200).send({ result });
			}
		}
	});
});

router.get('/buscarSinAuth/:id', (req, res) => {
	var _id = req.params.id;
	Usuario.find({ _id: _id }, function (err, result) {
		if (err) {
			res.status(500).send({
				message: 'Error al momento de ejecutar la solicitud',
			});
		} else {
			if (!result) {
				res.status(404).send({
					message: 'El registro a buscar no se encuentra disponible',
				});
			} else {
				res.status(200).send({ result });
			}
		}
	});
});

router.get('/listar', (req, res) => {
	Usuario.find({}, function (err, result) {
		if (err) {
			res.status(500).send({
				message: 'Error al momento de ejecutar la solicitud',
			});
		} else {
			if (!result) {
				res.status(404).send({
					message: 'El registro a buscar no se encuentra disponible',
				});
			} else {
				res.status(200).send({ result });
			}
		}
	});
});

router.get('/listarSinAuth', (req, res) => {
	Usuario.find({}, function (err, result) {
		if (err) {
			res.status(500).send({
				message: 'Error al momento de ejecutar la solicitud',
			});
		} else {
			if (!result) {
				res.status(404).send({
					message: 'El registro a buscar no se encuentra disponible',
				});
			} else {
				res.status(200).send({ result });
			}
		}
	});
});

router.delete('/borrar/:id', (req, res) => {
	var _id = req.params.id;
	Usuario.findOneAndDelete({ _id: _id }, function (err, usuario) {
		if (err) {
			console.log(err);
			return res.json(500, {
				message: 'No hemos encontrado la carrera',
			});
		}
		return res.json(usuario);
	});
});

router.delete('/borrarSinAuth/:id', (req, res) => {
	var _id = req.params.id;
	Usuario.findOneAndDelete({ _id: _id }, function (err, usuario) {
		if (err) {
			console.log(err);
			return res.json(500, {
				message: 'No hemos encontrado la carrera',
			});
		}
		return res.json(usuario);
	});
});

router.post('/editar/:id', (req, res) => {
	var id = req.params.id;
	Usuario.findOneAndUpdate(
		{ _id: id },
		req.body,
		{ new: true },
		function (err, Usuario) {
			if (err) res.send(err);
			res.json(Usuario);
		}
	);
});

router.post('/editarSinAuth/:id', (req, res) => {
	var id = req.params.id;
	Usuario.findOneAndUpdate(
		{ _id: id },
		req.body,
		{ new: true },
		function (err, Usuario) {
			if (err) res.send(err);
			res.json(Usuario);
		}
	);
});

/*
function deleteUsuarioById(req, res) {
  var _id = req.params.id;
  Usuario.findByIdAndRemove(_id, function (err, usuario) {
    if (err) {
      console.log(err);
      return res.json(500, {
        message: "No hemos encontrado la carrera",
      });
    }
    return res.json(usuario);
  });
}*/

module.exports = router;
