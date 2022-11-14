const express = require('express');
const router = express.Router();
const factura = require('../models/facturas');
const carrito = require('../models/carritoCompra');
const miconexion = require('../conexDB/conn');

//Consulta usando el metodo aggregate de mongoDB
router.get('/facturacarrito', (req, res) => {
	factura
		.aggregate([
			{
				$lookup: {
					from: 'carritocompras', //collection to join
					localField: 'idCarritoCompra', //field from the input documents
					foreignField: 'idCarritoCompra', //field from the documents of the "from" collection
					as: 'facturaxcarrito', //output array field
				},
			},
			{
				$unwind: '$facturaxcarrito',
			},
		])
		.then((result) => {
			res.send(result);
			console.log(result);
		})
		.catch((error) => {
			res.send(error);
			console.log(error);
		});
});

module.exports = router;
