const express = require('express');
const router = express.Router();
const CarritoCompra = require('../models/carritoCompra');

//Aqui van todos los métodos para operar en la BD

router.post('/crear', (req, res) => {
	var myCarritoCompra = new CarritoCompra(req.body);
	myCarritoCompra.save((err, result) => {
		res.status(200).send({ message: result });
	});
});

router.get('/buscar/:id', (req, res) => {
	var _id = req.params.id;
	CarritoCompra.find({ _id: _id }, function (err, result) {
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
	CarritoCompra.find({}, function (err, result) {
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
	CarritoCompra.findOneAndDelete({ _id: _id }, function (err, CarritoCompra) {
		if (err) {
			console.log(err);
			return res.json(500, {
				message: 'No hemos encontrado la carrera',
			});
		}
		return res.json(CarritoCompra);
	});
});

router.put('/editar/:id', (req, res) => {
	var id = req.params.id;
	CarritoCompra.findOneAndUpdate(
		{ _id: id },
		req.body,
		{ new: true },
		function (err, CarritoCompra) {
			if (err) res.send(err);
			res.json(CarritoCompra);
		}
	);
});

router.get('/carritoPorEstado/:estado/:idUsuario', (req, res) => {
	console.log(' req.params.idUsuario', req.params.idUsuario);
	CarritoCompra.findOne({
		idUsuario: req.params.idUsuario,
		estado: req.params.estado,
	}).exec(function (err, carrito) {
		if (err) res.send(err);
		res.json(carrito);
	});
});

/*
function deleteCarritoCompraById(req, res) {
  var _id = req.params.id;
  CarritoCompra.findByIdAndRemove(_id, function (err, CarritoCompra) {
    if (err) {
      console.log(err);
      return res.json(500, {
        message: "No hemos encontrado la carrera",
      });
    }
    return res.json(CarritoCompra);
  });
}*/

module.exports = router;
