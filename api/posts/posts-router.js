const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

router.get('/', (req, res) => {
  Posts.find()
    .then((posts) => res.status(201).json(posts))
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'The posts information could not be retrieved' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).json({ message: 'Please enter an id' });
  }

  Posts.findById(id)
    .then((post) => {
      if (!post) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exust' });
      }

      res.status(201).json(post);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'The post information could not be retrieved' });
    });
});

module.exports = router;
