'use strict';

const express = require('express');
const knex = require('../knex')
// eslint-disable-next-line new-cap
const router = express.Router();
const pg = require('pg')
const humps = require('humps')
// YOUR CODE HERE
router.get('/', function(req, res, next) {
    knex('books')
        .orderBy('title', 'asc')
        .then((books) => {
            res.send(humps.camelizeKeys(books))
        })
        .catch((err) => {
            next(err)
        })

})

router.get('/:id', function(req, res, next) {
  console.log('in books by id route');
    let id = req.params.id
    knex('books')
        .where('id', id)
        .orderBy('title', 'asc')
        .then((books) => {
          // console.log(books[0]);
            res.send(humps.camelizeKeys(books[0]))

        })
})
router.post('/', function(req, res, next) {;
    let book = req.body
    knex('books')
        .insert(
            humps.decamelizeKeys(book)
        )
        .returning('*')
        .then((data) => {
            res.send(humps.camelizeKeys(data[0]))
        })
})
router.patch('/:id', function(req, res, next) {
    let id = req.params.id
    let newData = req.body
    knex('books')
        .where('id', id)
        .returning(['id', 'title', 'author', 'genre', 'description', 'cover_url'])
        .update(humps.decamelizeKeys(newData))
        .then((data) => {
            res.send(humps.camelizeKeys(data)[0])
        })
})
router.delete('/:id', function(req, res, next) {
    let id = req.params.id
    knex('books')
        .returning(['title', 'author', 'genre', 'description', 'cover_url'])
        .where('id', id)
        .del()
        .then((data) => {
            res.send(humps.camelizeKeys(data)[0])
        })
})
module.exports = router;
