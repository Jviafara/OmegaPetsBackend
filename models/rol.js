var mongoose = require('mongoose');

//Se definen los modelos
var Schema = mongoose.Schema;

var rolSchema = Schema({
    idRol: String,
    nombreRol: String,
    descripcion: String,
});

// Definimos que lo vamos a usar en nuestra aplicación como un módulo.
const Rol = mongoose.model('roles', rolSchema);
module.exports = Rol;