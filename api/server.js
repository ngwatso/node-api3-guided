const express = require('express'); // ** importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// ** Global middleware
server.use(helmet());
server.use(methodLogger);
// server.use(morgan('dev'));
server.use(express.json());
server.use(addName);
server.use(lockout);

server.use('/api/hubs', hubsRouter);

server.get('/', addName, (req, res) => {
	res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.name ? req.name + ', ' : ''} to the Lambda Hubs API</p>
  `);
});

function methodLogger(req, res, next) {
	console.log(req.method);
	next();
}

function addName(req, res, next) {
	req.name = 'Nick';
	next();
}

function lockout(req, res, next) {
	const seconds = new Date().getSeconds();
	if (seconds % 3 === 0) {
		res.status(403).json({ message: 'api down' });
	} else {
		next();
	}
}

server.use((error, req, res, next) => {
	res.status(error.status).json({ message: error.message });
});

module.exports = server;
