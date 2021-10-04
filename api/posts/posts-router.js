const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

// [GET]
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

// [POST]
router.post('/', (req, res) => {
  console.log(req.body);
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

// [DELETE]

module.exports = router;
