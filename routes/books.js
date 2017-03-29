'use strict';

const express = require('express');
const knex = require('../knex')
// eslint-disable-next-line new-cap
const router = express.Router();
const pg = require('pg')
const humps = require('humps')
// YOUR CODE HERE
router.get('/books', function (req, res, next) {
  knex('books')
  .orderBy('title', 'asc')
  .then((books)=>{
// console.log(books);
    res.send(humps.camelizeKeys(books))
  })
  .catch((err)=> {
    next(err)
  })

})
module.exports = router;
