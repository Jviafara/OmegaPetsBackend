var express = require('express');
app = express();
const cors = require('cors');

app.use(cors());

bodyParser = require('body-parser'); //Parsea las peticiones
//en formato JSON

methodOverride = require('method-override');

monngose = require('mongoose'); //ODM para MongoDB y Node.js

app.use(express.json({ limit: '50mb' }));

app.use(
	express.urlencoded({
		limit: '10mb',
		extended: true,
		parameterLimit: 1000000,
	})
);
app.use(bodyParser.json());
//app.use(express.json({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

const rutas = require('./routes/router.js');
app.use('/OmegaPets', rutas);

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Authorization, X-API-KEY, Origin, XRequested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
	);
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, DELETE'
	);
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

module.exports = app;
