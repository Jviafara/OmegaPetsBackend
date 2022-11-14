const express = require("express");
const router = express.Router();
const modeloRol = require("../models/rol");
const modeloUsuario = require("../models/usuario");
const miconexion = require("../conexDB/conn");

//CONSULTA USANDO EL METODO AGGREGATE DE MONGODB
router.get("/usuariosroles", (req, res) => {
  //Coleccion primaria
  modeloRol
    .aggregate([
      {
        $lookup: {
          localField: "idRol",
          from: "usuarios", //Coleccion secundaria
          foreignField: "idRol", //Llave foranea
          as: "usuarios_rol",
        },
      },
      {
        $unwind: "$usuarios_rol", //Ruta de salida
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

//Cargar un producto http://localhost:5000/api/productos/cargar/1
router.get("/usuariosroles/:id", (req, res) => {
  //CONSULTA CON METODOS JAVASCRIPT Y MONGODB FILTRANDO POR ALGUN CAMPO DE LA COLECCION
  var dataRoles = [];
  //modeloRol.find({ nombreRol: "Administrado" }).then(data => {
  modeloRol
    .find({ idRol: req.params.id })
    .then((data) => {
      console.log("Rol:");
      console.log(data);
      data.map((d, k) => dataRoles.push(d.idRol));
      modeloUsuario
        .find({ idRol: { $in: dataRoles } })
        .then((data) => {
          console.log("Usuarios del rol:");
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
    });
});

module.exports = router;
