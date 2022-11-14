const mongoose = require("mongoose");

const articulo = require("../models/articulo");
const producto = require("../models/producto");
const miconexion = require("../conexDB/conn");

articulo.aggregate([{
   $lookup:{
      from: "productos",//collection to join
      localField: "idProducto",//field from the input documents
      foreignField: "idProducto",//field from the documents of the "from" collection
      as: "productoxarticulo",//output array field
   }
},
{
   $unwind: "$productoxarticulo"
}
]).then((result)=>{console.log(result)})
.catch((error)=>{console.log(error)});