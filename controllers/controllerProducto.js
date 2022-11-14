const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');

//Aqui van todos los métodos para operar en la BD

router.post('/crear', (req, res) => {
	var myProducto = new Producto(req.body);
	myProducto.save((err, result) => {
		res.status(200).send({ message: result });
	});
});
router.post('/crear', (req, res) => {
	var myProducto = new Producto(req.body);
	myProducto.save((err, result) => {
		res.status(200).send({ message: result });
	});
});

router.get('/buscar/:id', (req, res) => {
	var _id = req.params.id;
	Producto.findById({ _id: _id }, function (err, result) {
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
	Producto.find({}, function (err, result) {
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
	Producto.findOneAndDelete({ _id: _id }, function (err, Producto) {
		if (err) {
			console.log(err);
			return res.json(500, {
				message: 'No hemos encontrado la carrera',
			});
		}
		return res.json(Producto);
	});
});
router.get('/buscar/:id', (req, res) => {
	var _id = req.params.id;
	Producto.findById({ _id: _id }, function (err, result) {
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
	Producto.find({}, function (err, result) {
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
	Producto.findOneAndDelete({ _id: _id }, function (err, Producto) {
		if (err) {
			console.log(err);
			return res.json(500, {
				message: 'No hemos encontrado la carrera',
			});
		}
		return res.json(Producto);
	});
});

router.put('/editar/:id', (req, res) => {
	var id = req.params.id;
	Producto.findOneAndUpdate(
		{ _id: id },
		req.body,
		{ new: true },
		function (err, Producto) {
			if (err) res.send(err);
			res.json(Producto);
		}
	);
});

/*
function deleteProductoById(req, res) {
  var _id = req.params.id;
  Producto.findByIdAndRemove(_id, function (err, Producto) {
    if (err) {
      console.log(err);
      return res.json(500, {
        message: "No hemos encontrado la carrera",
      });
    }
    return res.json(Producto);
  });
}*/

module.exports = router;
