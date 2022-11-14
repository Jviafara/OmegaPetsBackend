var mongoose = require("mongoose");

//Se definen los modelos
var Schema = mongoose.Schema;

var articuloSchema = Schema({
  idArticulo: String,
  idCarritoCompra: String,
  idProducto: String,
  cantidad: Number,
  precioVenta: Number,
});

// Definimos que lo vamos a usar en nuestra aplicación como un módulo.
const Articulo = mongoose.model("articulos", articuloSchema);
module.exports = Articulo;
