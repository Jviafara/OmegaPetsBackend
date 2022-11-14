var mongoose = require("mongoose");

//Se definen los modelos
var Schema = mongoose.Schema;

var FacturaSchema = Schema({
  idFactura: String,
  fechaFactura: String,
  idUsuario: String,
  idCarritoCompra: String,
  estado: Boolean,
});

// Definimos que lo vamos a usar en nuestra aplicación como un módulo.
const Facturas = mongoose.model("facturas", FacturaSchema);
module.exports = Facturas;
