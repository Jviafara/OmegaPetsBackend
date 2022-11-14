var mongoose = require('mongoose');

//Se definen los modelos
var Schema = mongoose.Schema;

var carritoCompraSchema = Schema({
    idCarritoCompra: String,
    idArticulo: String,
    fecha: String,
    idFactura: String,
    estado: String,
    totalCompra: Number,
    idUsuario: String
});

// Definimos que lo vamos a usar en nuestra aplicación como un módulo.
const CarritoCompra = mongoose.model('carritocompras', carritoCompraSchema);
module.exports = CarritoCompra;