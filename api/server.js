const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// middlewares are functions and are passed into server.use
server.use(express.json()); // express.json when invoked returns a middleware function
server.use(morgan('dev'));

server.use((req, res, next) => {
  req.foo = 'iron maiden'
  console.log('iron maiden');
  next();
})

server.use((req, res, next) => {
  req.foo = 'lady gaga'
  console.log('lady gaga');
  next();
})

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  res.send(`
  <h2>Lambda Hubs API</h2>
  <p>Welcome ${req.foo} to the Lambda Hubs API</p>
  `);
});

server.use((err, req, res, next) => {

})

module.exports = server;
