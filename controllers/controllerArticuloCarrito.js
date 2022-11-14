const express = require('express');
const router = express.Router();
const carritoCompra = require('../models/carritoCompra');
const articulo = require('../models/articulo');
const miconexion = require('../conexDB/conn');
const CarritoCompra = require('../models/carritoCompra');
const Producto = require('../models/producto');

//Consulta usando el metodo aggregate de mongoDB
router.get('/articulocarrito', (req, res) => {
	CarritoCompra.aggregate([
		{
			$lookup: {
				from: 'articulos', //collection to join
				localField: 'idCarritoCompra', //field from the input documents
				foreignField: 'idCarritoCompra', //field from the documents of the "from" collection
				as: 'articuloxcarrito', //output array field
			},
		},
		{
			$unwind: '$articuloxcarrito',
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

router.delete('/articulocarrito/:idCarritoCompra/:idProducto', (req, res) => {
	const idCarritoCompra = req.params.idCarritoCompra;
	const idProducto = req.params.idProducto;
	articulo
		.findOneAndDelete({ idCarritoCompra, idProducto })
		.then((articulo, err) => {
			if (err) {
				console.log(err);
				return res.json(500, {
					message: 'No se ha encontrado artículo',
				});
			}
			console.log('articulo para remover', articulo);
			return res.json(articulo);
		});
});

router.get('/articulocarrito/:id', (req, res) => {
	//CONSULTA CON METODOS JAVASCRIPT Y MONGODB FILTRANDO POR ALGUN CAMPO DE LA COLECCION
	var dataCarrito = [];
	console.log('idcarrito', req.params.id);
	CarritoCompra.find({ idCarritoCompra: req.params.id })
		.then((carrito) => {
			console.log('Carrito:');
			console.log(carrito);
			carrito.map((d, k) => dataCarrito.push(d.idCarritoCompra));
			articulo
				.find({ idCarritoCompra: { $in: dataCarrito } })
				.then((articulos) => {
					console.log('Articulos del carrito:');
					console.log(articulos);
					const articulosId = articulos.map(
						(articulo) => articulo.idProducto
					);
					console.log('articulosid', articulosId);
					Producto.find({ idProducto: { $in: articulosId } }).then(
						(productos) => {
							const nuevosProductos = productos.map(
								(producto) => {
									const articulo = articulos.find(
										(articulo) => {
											return (
												articulo.idProducto ===
												producto.idProducto
											);
										}
									);
									producto.cantidad = articulo.cantidad || 1;
									return producto;
								}
							);
							console.log('nuevosproductos', nuevosProductos);
							res.send({
								...carrito[0]._doc,
								articulos: nuevosProductos,
							});
						}
					);
				})
				.catch((error) => {
					console.log(error);
					res.send(error);
				});
		})
		.catch((error) => {
			console.log(error);
			res.send(error);
		});
});

module.exports = router;
