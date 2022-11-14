/** Estara la coneción de manera global y podrá ser reutilizada */
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/bdomegapet');
mongoose.connect(
 	'mongodb+srv://OmegaPets:cHgFKOaKFN0vR7I2@cluster0.75fngfe.mongodb.net/?retryWrites=true&w=majority'
);
require('dotenv').config({ path: 'variables.env' });

// const conectarDB = async () => {
// 	try {
// 		await mongoose.connect(process.env.DB_MONGO, {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 		});
// 		console.log('Conexion exitosa a la base de datos MongoDB!!!');
// 	} catch (error) {
// 		console.log('Hay un error en la conexion a MongoDB!!!');
// 		process.exit(1);
// 	}
// };

const miconexion = mongoose.connection;

miconexion.on('connected', () => {
	console.log('Conexion exitosa a la base de datos MongoDB!!!');
});
miconexion.on('error', () => {
	console.log('Hay un error en la conexion a MongoDB!!!');
});
module.exports = mongoose;
