// imports
const express = require('express');

// initialization
const server = express();
const postsRouter = require('./posts/posts-router');

// middleware
server.use(express.json());
server.use('/api/posts', postsRouter);

// endpoints
server.get('/', (req, res) => {
  res.status(201).json({ message: 'server do be running fam' });
});

module.exports = server;
