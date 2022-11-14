const express = require('express');
const router = express.Router();
const factura = require('../models/facturas');
const usuario = require('../models/usuario');
const carrito = require('../models/carritoCompra');
const miconexion = require('../conexDB/conn');

//CONSULTA USANDO EL METODO AGGREGATE DE MONGODB
router.get('/facturausuariocarrito', (req, res) => {
	//Colección primaria
	factura
		.aggregate([
			{
				$lookup: {
					from: 'carritocompras', //collection to join
					localField: 'idCarritoCompra', //field from the input documents
					foreignField: 'idCarritoCompra', //field from the documents of the "from" collection
					as: 'facturaCarrito', //output array field
				},
			},
			{
				$lookup: {
					from: 'usuarios', //Coleccion secundaria
					localField: 'idUsuario',
					foreignField: 'idUsuario', //Llave foranea
					as: 'facturaUsuario',
				},
			},
			{
				//Ruta de salida
				$unwind: '$facturaCarrito',
				$unwind: '$facturaUsuario',
			},
		])
		.then((result) => {
			res.send(result);
			//console.log(result);
		})
		.catch((error) => {
			res.send(error);
		});
});

router.get('/facturausuariocarrito/:id', (req, res) => {
	//Colección primaria
	factura
		.aggregate([
			{
				$lookup: {
					from: 'carritocompras', //collection to join
					localField: 'idCarritoCompra', //field from the input documents
					foreignField: 'idCarritoCompra', //field from the documents of the "from" collection
					as: 'facturaCarrito', //output array field
				},
			},
			{
				$lookup: {
					from: 'usuarios', //Coleccion secundaria
					localField: 'idUsuario',
					foreignField: 'idUsuario', //Llave foranea
					as: 'facturaUsuario',
				},
			},
			{
				//Ruta de salida
				$unwind: '$facturaCarrito',
				$unwind: '$facturaUsuario',
			},
		])
		.then((result) => {
			const data = result.find(el=>el._id== req.params.id)
			res.send(data);
			//console.log(result);
		})
		.catch((error) => {
			res.send(error);
		});
});

module.exports = router;
