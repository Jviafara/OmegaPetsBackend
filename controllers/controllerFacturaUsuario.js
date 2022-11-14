const express = require('express');
const router = express.Router();
const modeloFactura = require('../models/facturas');
const modeloUsuario = require('../models/usuario');
const miconexion = require('../conexDB/conn');

//CONSULTA USANDO EL METODO AGGREGATE DE MONGODB
router.get('/facturausuario', (req, res) => {
	//Colección primaria
	modeloFactura
		.aggregate([
			{
				$lookup: {
					from: 'usuarios', //Coleccion secundaria
					localField: 'idUsuario',
					foreignField: 'idUsuario', //Llave foranea
					as: 'facturaUsuario',
				},
			},
			{
				$unwind: '$facturaUsuario', //Ruta de salida
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

//Cargar un producto
router.get("/facturausuario/:id", (req,res) =>{
    //CONSULTA CON METODOS JAVASCRIPT Y MONGODB FILTRANDO POR ALGUN CAMPO DE LA COLECCIÓN
    var dataFacturas =[];
    //modeloRol.Find({nombreRol: "Administrador"}).then((result) =>{}
    //modeloFactura
    /* .find({idFactura: req.params.id})
    .then((data) =>{
        console.log("Factura:");
        console.log(data);
        //dataFacturas.map((d,k) => dataFacturas.push(d.idFactura));
        dataUsuarios = data.map((factura) => factura.idUsuario);
        modeloUsuario
        .find({ idUsuario: { $in:dataUsuarios } })
        .then((data) =>{
            console.log("Usuario de la factura:");
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            res.send(error);
        });
    })
    .catch((error) => {
        console.log(error);
        res.send(error);
    }); */

    modeloFactura
    .aggregate([
      {
        $lookup: {
            from: "usuarios", //Coleccion secundaria
            localField: "idUsuario",
            foreignField: "idUsuario", //Llave foranea
            as: "factura_usuario",
        }
      },
      {
        $unwind: "$factura_usuario", //Ruta de salida
      },
    ])
    .then((result) => {
      const data = result.find(el=>el._id== req.params.id)
      res.send(data);
      console.log(result);
    })
    .catch((error) => {
      res.send(error);
    });
})
module.exports = router;
