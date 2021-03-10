const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');
const cors = require('cors');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// middlewares are functions and are passed into server.use
server.use(express.json()); // express.json when invoked returns a middleware function
server.use(morgan('dev'));
server.use(cors());

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

server.use('/api/hubs', addLambdaHeader, hubsRouter);

server.get('/', addLambdaHeader, (req, res) => {
  // throw new Error('argh! disaster')
  res.send(`
  <h2>Lambda Hubs API</h2>
  <p>Welcome ${req.foo} to the Lambda Hubs API</p>
  `);
});

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message, // DEV
    stack: err.stack, // DEV
    custom: 'something went terrible in general', // PRODUCTION
  })
})

module.exports = server;
var a = 7

function addLambdaHeader(req, res, next) {
  console.log(a)
  res.set('X-Lambda', 'rocks');
  next();
}
