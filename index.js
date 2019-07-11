// implement your API here

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./data/db');

const server = express();

server.use(bodyParser.json());

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' });
    });
});

server.get('/api/users/:id', (req, res) => {
  db.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' });
    });
});

server.post('/api/users', (req, res) => {
  if (req.body.name === '' || req.body.bio === '') {
    return res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  }
  db.insert(req.body)
      .then(user => {
        
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(500).json({
        error: 'There was an error while saving the user to the database'
      });
    });
});

server.delete('/api/users/:id', (req, res) => {
  db.remove(req.params.id)
    .then(userDeleted => {
      if (userDeleted) {
        res.status(204).json(userDeleted);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'The user could not be removed' });
    });
});

server.put('/api/users/:id', (req, res) => {
  if (req.body.name === '' || req.body.bio === '') {
    return res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  }
  db.update(req.params.id, req.body)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'The user could not be removed' });
    });
});

server.listen(4500, () => {
  console.log('server listening on port 4500');
});
