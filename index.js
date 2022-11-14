var app = require('./app');

var mongoose = require('./conexDB/conn.js');

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log('Servidor corriendo 0K!', port);
});
