const modeloRol = require("../models/rol");
const modeloUsuario = require("../models/usuario");
const miconexio = require("../conexDB/conn");

//CONSULTA USANDO EL METODO AGGREGATE DE MONGODB
/*
modeloRol
  .aggregate([
    {
      $lookup: {
        from: "usuarios", //Coleccion secundaria
        localField: "idRol",
        foreignField: "idUSuario", //Llave foranea
        as: "usuarios_rol",
      },
    },
    {
      $unwind: "$usuarios_rol", //Ruta de salida
    }
  ])
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  })
*/
//CONSULTA CON METODOS JAVASCRIPT Y MONGODB FILTRANDO POR ALGUN CAMPO DE LA COLECCION
var dataRoles = [];
//modeloRol.find({ nombreRol: "Administrado" }).then(data => {
modeloRol
  .find({ idRol: "2" })
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
      .catch((error) => console.log(error));
  })
  .catch((error) => console.log(error));
