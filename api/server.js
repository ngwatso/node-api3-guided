const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// middlewares are functions and are passed into server.use
server.use(express.json()); // express.json when invoked returns a middleware function

server.use('/api/hubs', hubsRouter);

server.use(morgan('combined'));

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});


module.exports = server;
