var mongoose = require('mongoose');

//Se definen los modelos
var Schema = mongoose.Schema;

var productoSchema = Schema({
	idProducto: String,
	codigo: String,
	categoria: String,
	referencia: String,
	codBarras: String,
	nombreProducto: String,
	foto: Object,
	descripcion: String,
	precio: Number,
	estado: String,
	fechaCreacion: Date,
});

// Definimos que lo vamos a usar en nuestra aplicación como un módulo.
const Producto = mongoose.model('productos', productoSchema);
module.exports = Producto;
