const mongoose = require("mongoose");

const carritoCompra = require("../models/carritoCompra");
const articulo = require("../models/articulo");
const miconexion = require("../conexDB/conn");

articulo.aggregate([{
   $lookup:{
      from: "carritocompras", //collection to join
      localField: "idCarritoCompra",//field from the input documents
      foreignField: "idCarritoCompra", //field from the documents of the "from" collection
      as: "articuloxcarrito", //output array field
   }
},
{
   $unwind: "$articuloxcarrito"
}
]).then((result)=>{console.log(result)})
.catch((error)=>{console.log(error)});