const express = require('express');
const helmet = require('helmet');
const knex = require('knex')

const config = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3'
  },
  useNullAsDefault: true,
}

const db = knex(config)

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

server.post('/api/zoos', (req, res) => {
  db('zoos').insert(req.body)
  .then(data => {
    res.status(201).json(data)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

server.get('/api/zoos/:id', (req, res) => {
  const id = req.params.id
  db('zoos').where({id})
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params
  db('zoos').where({id}).update(req.body)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
})

server.delete('/api/zoos/:id', (req, res) => {
  const {id} = req.params
  db('zoos').where({id}).del()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
