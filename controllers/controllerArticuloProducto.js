const express = require('express');
const router = express.Router();
const producto = require('../models/producto');
const articulo = require('../models/articulo');
const miconexion = require('../conexDB/conn');

//Consulta usando el metodo aggregate de mongoDB
router.get('/articuloproducto', (req, res) => {
	articulo
		.aggregate([
			{
				$lookup: {
					from: 'productos', //collection to join
					localField: 'idArticulo', //field from the input documents
					foreignField: 'idArticulo', //field from the documents of the "from" collection
					as: 'productoxarticulo', //output array field
				},
			},
			{
				$unwind: '$productoxarticulo',
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
