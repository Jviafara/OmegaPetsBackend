var mongoose = require('mongoose');

//Se definen los modelos
var Schema = mongoose.Schema;

var usuarioSchema = Schema({
	idUsuario: String,
	idRol: String,
	idFactura: String,
	email: { type: String, required: true, trim: true, unique: true },
	password: String,
	nombres: String,
	apellidos: String,
	docIdentificacion: String,
	fechaNacimiento: Date,
	genero: String,
	direccion: String,
	telefono: String,
	ciudad: String,
	listaFavoritos: Array,
	registro: { type: Date, default: Date.now() },
});

// Definimos que lo vamos a usar en nuestra aplicación como un módulo.
const Usuario = mongoose.model('usuarios', usuarioSchema);
module.exports = Usuario;
