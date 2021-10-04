// imports
const express = require('express');

// initialization
const server = express();

// middleware
server.use(express.json());

// endpoints
server.get('/', (req, res) => {
  res.status(201).json({ message: 'server do be running fam' });
});

module.exports = server;
