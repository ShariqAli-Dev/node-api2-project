const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

// [GET]
router.get('/:id/comments', (req, res) => {
  const { id } = req.params;

  Posts.findCommentById(id)
    .then((comments) => {
      if (!comments) {
        res
          .status(404)
          .json({ message: 'The comments information could not be retrieved' });
      }

      res.status(201).json(comments);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'The comments information could not be retrieved' });
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
          .status(400)
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

router.get('/', (req, res) => {
  Posts.find()
    .then((posts) => res.status(201).json(posts))
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'The posts information could not be retrieved' });
    });
});

// [POST]
router.post('/', (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({ message: 'Please provide title and contents for the post' });
  }

  Posts.insert({ title, contents })
    .then((post) => res.status(201).json(post))
    .catch((err) =>
      res.status(500).json({
        message: 'There was an error while saving the post to the database',
      })
    );
});

// [PUT]
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({ message: 'Please provide title and contents for the post' });
  }

  Posts.update(id, { title, contents })
    .then((post) => {
      if (!post) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
      }

      res.status(200).json(post);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'The post information could not be found' });
    });
});

// [DELETE]
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Posts.remove(id)
    .then((recordsDelete) => {
      if (!recordsDelete) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
      }

      res.status(201).json(recordsDelete);
    })
    .catch((err) => {
      res.status(500).json({ message: 'The post could not be removed' });
    });
});

module.exports = router;
